"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const RecruitApplies_1 = require("./entity/RecruitApplies");
const RecruitKeeps_1 = require("./entity/RecruitKeeps");
const RecruitComments_1 = require("./entity/RecruitComments");
const RecruitPostImages_1 = require("./entity/RecruitPostImages");
const RecruitPosts_1 = require("./entity/RecruitPosts");
const RecruitStacks_1 = require("./entity/RecruitStacks");
const RecruitTasks_1 = require("./entity/RecruitTasks");
const Users_1 = require("../user/entity/Users");
let RecruitPostService = class RecruitPostService {
    constructor(UsersRepository, recruitAppliesRepository, recruitKeepsRepository, recruitCommentsRepository, recruitPostImagesRepository, recruitStacksRepository, recruitTasksRepository, recruitPostsRepository, connection) {
        this.UsersRepository = UsersRepository;
        this.recruitAppliesRepository = recruitAppliesRepository;
        this.recruitKeepsRepository = recruitKeepsRepository;
        this.recruitCommentsRepository = recruitCommentsRepository;
        this.recruitPostImagesRepository = recruitPostImagesRepository;
        this.recruitStacksRepository = recruitStacksRepository;
        this.recruitTasksRepository = recruitTasksRepository;
        this.recruitPostsRepository = recruitPostsRepository;
        this.connection = connection;
    }
    async ReadAllRecruits(loginId, order, items, location, task, stacks, lastId) {
        try {
            const cursorPost = !lastId
                ? null
                : await (0, typeorm_2.getRepository)(RecruitPosts_1.RecruitPosts).findOne(lastId);
            const cursorPostId = cursorPost.recruitPostId;
            const lastPostKeepCount = cursorPost.recruitKeepCount;
            let recruitQuery;
            if (cursorPost) {
                recruitQuery = await (0, typeorm_2.getRepository)(RecruitPosts_1.RecruitPosts)
                    .createQueryBuilder('P')
                    .leftJoinAndSelect('P.recruitKeeps', 'K')
                    .leftJoinAndSelect('P.recruitPostImages', 'I')
                    .leftJoinAndSelect('P.recruitTasks', 'T')
                    .leftJoinAndSelect('P.recruitStacks', 'S')
                    .andWhere('K.userId = :loginId', { loginId });
            }
            let filterTaskOrStackRecruitQuery = recruitQuery;
            if (stacks) {
                for (const stack in stacks) {
                    filterTaskOrStackRecruitQuery = filterTaskOrStackRecruitQuery.orWhere('S.recruitStack = :stack', { stack });
                }
            }
            else if (task) {
                filterTaskOrStackRecruitQuery = recruitQuery.andWhere('T.recruitTask = :task', { task });
            }
            let filterLocationRecruitQuery = filterTaskOrStackRecruitQuery;
            if (location) {
                filterLocationRecruitQuery = filterTaskOrStackRecruitQuery.andWhere('P.recruitLocation = :location', { location });
            }
            console.log('필터 종료 & 정렬 시작');
            let orderRecruitQuery;
            if (!cursorPost) {
                orderRecruitQuery = filterLocationRecruitQuery
                    .orderBy('P.recruitPostId', 'DESC')
                    .take(items)
                    .getMany();
            }
            else if (order === 0) {
                orderRecruitQuery = filterLocationRecruitQuery
                    .andWhere('P.recruitKeepCount > :cursorPostId', { cursorPostId })
                    .orderBy('P.recruitPostId', 'DESC')
                    .take(items)
                    .getMany();
            }
            else if (order === 1) {
                orderRecruitQuery = filterLocationRecruitQuery
                    .andWhere('P.recruitKeepCount >= :lastPostKeepCount', {
                    lastPostKeepCount,
                })
                    .andWhere('P.recruitPostId < :lastPostId', { cursorPostId })
                    .orderBy('P.recruitKeepCount', 'DESC')
                    .addOrderBy('P.recruitPostId', 'DESC')
                    .take(items)
                    .getMany();
            }
            console.log('get 쿼리 끝', orderRecruitQuery);
            return orderRecruitQuery;
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async ReadSpecificRecruits(recruitPostId) {
        try {
            console.log(typeof recruitPostId);
            const recruitPost = await this.recruitPostsRepository
                .createQueryBuilder('P')
                .leftJoinAndSelect('P.recruitStacks', 'S')
                .leftJoinAndSelect('P.recruitTasks', 'T')
                .leftJoinAndSelect('P.recruitPostImages', 'I')
                .leftJoinAndSelect('P.recruitComments', 'C')
                .leftJoin('C.user', 'U')
                .addSelect(['U.nickname', 'U.activityPoint', 'U.userId'])
                .andWhere('P.recruitPostId = :id', { id: recruitPostId })
                .orderBy('C.commentGroup', 'DESC')
                .addOrderBy('C.recruitCommentId', 'DESC')
                .getOne();
            recruitPost.viewCount = recruitPost.viewCount + 1;
            await this.recruitPostsRepository.save(recruitPost);
            return recruitPost;
        }
        catch (_a) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async createRecruit(recruitPost, imgUrls, stacks, tasks) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await queryRunner.manager
                .getRepository(RecruitPosts_1.RecruitPosts)
                .save(recruitPost);
            const recruitPostId = result.recruitPostId;
            const recruitPostImages = [];
            for (const imgUrl of imgUrls) {
                recruitPostImages.push({ recruitPostId, imgUrl });
            }
            const recruitStacks = this.mappingStacks(stacks, recruitPostId);
            const recruitTasks = this.mappingTasks(tasks, recruitPostId);
            await Promise.all([
                queryRunner.manager
                    .getRepository(RecruitStacks_1.RecruitStacks)
                    .createQueryBuilder()
                    .insert()
                    .into(RecruitStacks_1.RecruitStacks)
                    .values(recruitStacks)
                    .execute(),
                queryRunner.manager
                    .getRepository(RecruitTasks_1.RecruitTasks)
                    .createQueryBuilder()
                    .insert()
                    .into(RecruitTasks_1.RecruitTasks)
                    .values(recruitTasks)
                    .execute(),
                queryRunner.manager
                    .getRepository(RecruitPostImages_1.RecruitPostImages)
                    .createQueryBuilder()
                    .insert()
                    .into(RecruitPostImages_1.RecruitPostImages)
                    .values(recruitPostImages)
                    .execute(),
            ]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateRecruitPost(recruitPost, recruitPostImages, recruitStacks, recruitTasks) {
        recruitPost;
        recruitPostImages;
        recruitStacks;
        recruitTasks;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createComment(recruitPostId, comment) {
        try {
            const post = await this.recruitPostsRepository.findOne(recruitPostId);
            post.recruitCommentCount = post.recruitCommentCount + 1;
            await Promise.all([
                this.recruitCommentsRepository.save(comment),
                this.recruitPostsRepository.save(post),
            ]);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async updateComment(commentId, comment) {
        try {
            await this.recruitCommentsRepository.update(commentId, comment);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async createKeepIt(keepIt) {
        try {
            const returned = await this.recruitKeepsRepository
                .createQueryBuilder('K')
                .leftJoinAndSelect('K.recruitPost', 'P')
                .getOne();
            if (returned)
                throw new common_1.HttpException('이미 킵잇되있어용~', 400);
            const post = returned.recruitPost;
            post.recruitKeepCount++;
            await Promise.all([
                this.recruitKeepsRepository
                    .createQueryBuilder('K')
                    .insert()
                    .into('K')
                    .values(keepIt)
                    .execute(),
                this.recruitPostsRepository
                    .createQueryBuilder('P')
                    .insert()
                    .into('P')
                    .values(post)
                    .execute(),
            ]);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async createApply(apply) {
        try {
            await this.recruitAppliesRepository.save(apply);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async deleteComment(commentId) {
        try {
            const returnedComments = await this.recruitCommentsRepository
                .createQueryBuilder('C')
                .where('commentId = :commentId', { commentId })
                .getMany();
            if (returnedComments.length > 1) {
                await this.recruitCommentsRepository
                    .createQueryBuilder()
                    .update(RecruitComments_1.RecruitComments)
                    .set({ recruitCommentContent: null })
                    .where('id = :id', { id: commentId })
                    .execute();
                return;
            }
            await this.recruitCommentsRepository.delete(commentId);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async deleteKeepIt(recruitKeepId) {
        try {
            const isExist = await this.recruitKeepsRepository
                .createQueryBuilder('K')
                .leftJoinAndSelect('K.recruitPost', 'P')
                .getOne();
            console.log(isExist, isExist.recruitKeepId, '가나다');
            if (!isExist.recruitKeepId) {
                throw new common_1.HttpException('지울 데이터가 없어요', 400);
            }
            isExist.recruitPost.recruitKeepCount--;
            await Promise.all([this.recruitKeepsRepository.delete(recruitKeepId)]);
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    async deleteApply(applyId) {
        const isExist = await this.recruitAppliesRepository.findOne(applyId);
        try {
            if (isExist.recruitApplyId) {
                await this.recruitAppliesRepository.delete(applyId);
            }
        }
        catch (error) {
            throw new common_1.HttpException('다시 시도해주세요', 500);
        }
    }
    mappingImages(images, recruitPostId) {
        const recruitPostImages = images.map((item) => {
            const obj = new RecruitPostImages_1.RecruitPostImages();
            obj.recruitPostImageId = item.recruitPostImageId;
            obj.recruitPostId = recruitPostId;
            obj.imgUrl = item.imgUrl;
            return obj;
        });
        return recruitPostImages;
    }
    mappingStacks(stacks, recruitPostId) {
        const recruitStacks = stacks.map((item) => {
            const obj = new RecruitStacks_1.RecruitStacks();
            obj.recruitPostId = recruitPostId;
            obj.numberOfPeopleRequired = item.numberOfPeopleRequired;
            obj.numberOfPeopleSet = item.numberOfPeopleSet;
            obj.recruitStack = item.recruitStack;
            return obj;
        });
        return recruitStacks;
    }
    mappingTasks(tasks, recruitPostId) {
        const recruitTasks = tasks.map((item) => {
            const obj = new RecruitTasks_1.RecruitTasks();
            obj.recruitPostId = recruitPostId;
            obj.numberOfPeopleRequired = item.numberOfPeopleRequired;
            obj.numberOfPeopleSet = item.numberOfPeopleSet;
            obj.recruitTask = item.recruitTask;
            return obj;
        });
        return recruitTasks;
    }
};
RecruitPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(RecruitApplies_1.RecruitApplies)),
    __param(2, (0, typeorm_1.InjectRepository)(RecruitKeeps_1.RecruitKeeps)),
    __param(3, (0, typeorm_1.InjectRepository)(RecruitComments_1.RecruitComments)),
    __param(4, (0, typeorm_1.InjectRepository)(RecruitPostImages_1.RecruitPostImages)),
    __param(5, (0, typeorm_1.InjectRepository)(RecruitStacks_1.RecruitStacks)),
    __param(6, (0, typeorm_1.InjectRepository)(RecruitTasks_1.RecruitTasks)),
    __param(7, (0, typeorm_1.InjectRepository)(RecruitPosts_1.RecruitPosts)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], RecruitPostService);
exports.RecruitPostService = RecruitPostService;
//# sourceMappingURL=recruitPost.service.js.map