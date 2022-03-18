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
exports.RecruitPostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const apply_dto_1 = require("./DTO/apply.dto");
const recruitComment_dto_1 = require("./DTO/recruitComment.dto");
const recruitPost_dto_1 = require("./DTO/recruitPost.dto");
const RecruitApplies_1 = require("./entity/RecruitApplies");
const RecruitComments_1 = require("./entity/RecruitComments");
const RecruitKeeps_1 = require("./entity/RecruitKeeps");
const RecruitPosts_1 = require("./entity/RecruitPosts");
const recruitPost_service_1 = require("./recruitPost.service");
let RecruitPostController = class RecruitPostController {
    constructor(recruitService) {
        this.recruitService = recruitService;
    }
    async getAllRecruits(query) {
        const userId = 'cgh';
        const order = query.order;
        const items = query.items ? query.items : 12;
        const location = query.location;
        const task = query.task;
        const stack = query.stack;
        const lastId = query.lastId;
        const recruits = await this.recruitService.ReadAllRecruits(userId, order, items, location, task, stack, lastId);
        const post = recruits.map((item) => {
            const obj = item;
            obj.recruitDurationWeeks = recruits.recruitDurationDays / 7;
            return obj;
        });
        return post;
    }
    async getDetailRecruit(recruitPostId) {
        console.log(' 컨트롤러 도착 서비스 전');
        const details = await this.recruitService.ReadSpecificRecruits(recruitPostId);
        details.recruitDurationWeeks = details.recruitDurationDays / 7;
        return details;
    }
    async postRecruit(body) {
        const userId = 'cgh';
        const recruitPost = new RecruitPosts_1.RecruitPosts();
        recruitPost.userId = userId;
        recruitPost.title = body.title;
        recruitPost.recruitContent = body.recruitContent;
        recruitPost.recruitLocation = body.recruitLocation;
        recruitPost.recruitDurationDays = body.recruitDurationWeek * 7;
        recruitPost.endAt = null;
        recruitPost.recruitKeepCount = 0;
        recruitPost.viewCount = 0;
        recruitPost.recruitCommentCount = 0;
        const imgUrls = body.imgUrls;
        const { recruitTasks, recruitStacks, } = body;
        await this.recruitService.createRecruit(recruitPost, imgUrls, recruitStacks, recruitTasks);
        return { success: true };
    }
    modifyRecruit(recruitPostId, body) {
        const userId = 'test';
        const recruitPost = new RecruitPosts_1.RecruitPosts();
        recruitPost.userId = userId;
        recruitPost.title = body.title;
        recruitPost.recruitLocation = body.recruitLocation;
        recruitPost.recruitContent = body.recruitContent;
        recruitPost.recruitDurationDays = body.recruitDurationWeek * 7;
        recruitPost.endAt = null;
        const imgUrls = body.imgUrls;
        const recruitStacks = body.recruitStacks;
        const recruitTasks = body.recruitTasks;
        this.recruitService.updateRecruitPost(recruitPost, imgUrls, recruitStacks, recruitTasks);
    }
    async postComment(recruitPostId, body) {
        const userId = 'cgh';
        const comment = new RecruitComments_1.RecruitComments();
        comment.userId = userId;
        comment.recruitPostId = recruitPostId;
        comment.commentDepth = body.commentDepth;
        comment.commentGroup = body.commentGroup;
        comment.recruitCommentContent = body.recruitCommentContent;
        await this.recruitService.createComment(recruitPostId, comment);
        return { success: true };
    }
    async modifyComment(recruitPostId, recruitCommentId, body) {
        const userId = 'cgh';
        const comment = new RecruitComments_1.RecruitComments();
        comment.userId = userId;
        comment.commentDepth = body.commentDepth;
        comment.commentGroup = body.commentGroup;
        comment.recruitCommentContent = body.recruitCommentContent;
        await this.recruitService.updateComment(recruitCommentId, comment);
        return { success: true };
    }
    async postApply(recruitPostId, body) {
        const userId = 'cgh';
        const apply = new RecruitApplies_1.RecruitApplies();
        apply.applicant = userId;
        apply.recruitPostId = recruitPostId;
        apply.applyMessage = body.applyMessage;
        apply.task = body.task;
        apply.isAccepted = false;
        await this.recruitService.createApply(apply);
        return { success: true };
    }
    async postKeepIt(recruitId) {
        const userId = 'cgh';
        const recruitKeepIt = new RecruitKeeps_1.RecruitKeeps();
        recruitKeepIt.userId = userId;
        recruitKeepIt.recruitPostId = recruitId;
        this.recruitService.createKeepIt(recruitKeepIt);
        return { success: true };
    }
    async removeApply(applyId) {
        this.recruitService.deleteApply(applyId);
        return { success: true };
    }
    async removeKeepIt(keepId) {
        this.recruitService.deleteKeepIt(keepId);
        return { success: true };
    }
    async removeComment(commentId) {
        this.recruitService.deleteComment(commentId);
        return { success: true };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'task',
        required: true,
        description: 'task',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        required: true,
        description: 'order',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'items',
        required: true,
        description: 'items',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'stack',
        required: false,
        description: 'stack',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lastId',
        required: false,
        description: 'lastId',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 게시물 전체 불러오기' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "getAllRecruits", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '상세 협업 게시물',
    }),
    (0, common_1.Get)('/:recruitPostId'),
    (0, swagger_1.ApiOperation)({ summary: '협업 상세 게시물 불러오기' }),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "getDetailRecruit", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '상세 협업 게시물 아이디',
    }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '협업 게시물 쓰기' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recruitPost_dto_1.RecruitPostDTO]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "postRecruit", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '상세 협업 게시물 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 게시물 수정' }),
    (0, common_1.Put)('/:recruitPostId'),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, recruitPost_dto_1.RecruitPostDTO]),
    __metadata("design:returntype", void 0)
], RecruitPostController.prototype, "modifyRecruit", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '댓글 쓰기',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 댓글 쓰기' }),
    (0, common_1.Post)('/:recruitPostId/comment'),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, recruitComment_dto_1.RecruitCommentDTO]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "postComment", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '협업 아이디',
    }),
    (0, swagger_1.ApiParam)({
        name: 'recruitCommentId',
        required: true,
        description: '댓글 아이디',
    }),
    (0, common_1.Put)('/:recruitPostId/comment/:recruitCommentId'),
    (0, swagger_1.ApiOperation)({ summary: '협업 댓글 수정하기' }),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('recruitCommentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, recruitComment_dto_1.RecruitCommentDTO]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "modifyComment", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '포스트 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 신청하기' }),
    (0, common_1.Post)('/:recruitPostId/apply'),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_dto_1.RecruitApplyDTO]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "postApply", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '포스트 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 keep하기' }),
    (0, common_1.Post)('/:recruitPostId/keepIt'),
    __param(0, (0, common_1.Param)('recruitPostId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "postKeepIt", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitPostId',
        required: true,
        description: '포스트 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 신청 취소하기' }),
    (0, common_1.Delete)('/:recruitPostId/:applyId'),
    __param(0, (0, common_1.Param)('applyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "removeApply", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitKeepId',
        required: true,
        description: '킵잇 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 keep취소하기' }),
    (0, common_1.Delete)('/:recruitKeepId'),
    __param(0, (0, common_1.Param)('recruitKeepId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "removeKeepIt", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'recruitCommentId',
        required: true,
        description: '댓글 아이디',
    }),
    (0, swagger_1.ApiOperation)({ summary: '협업 댓글 삭제하기' }),
    (0, common_1.Delete)('/:recruitCommentId'),
    __param(0, (0, common_1.Param)('recruitCommentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecruitPostController.prototype, "removeComment", null);
RecruitPostController = __decorate([
    (0, swagger_1.ApiTags)('프로젝트 게시판'),
    (0, common_1.Controller)('recruit'),
    __metadata("design:paramtypes", [recruitPost_service_1.RecruitPostService])
], RecruitPostController);
exports.RecruitPostController = RecruitPostController;
//# sourceMappingURL=recruitPost.controller.js.map