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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitPosts = void 0;
const typeorm_1 = require("typeorm");
const RecruitApplies_1 = require("./RecruitApplies");
const RecruitComments_1 = require("./RecruitComments");
const RecruitKeeps_1 = require("./RecruitKeeps");
const RecruitPostImages_1 = require("./RecruitPostImages");
const Users_1 = require("../../user/entity/Users");
const RecruitStacks_1 = require("./RecruitStacks");
const RecruitTasks_1 = require("./RecruitTasks");
let RecruitPosts = class RecruitPosts {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'recruitPostId',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "recruitPostId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'title', nullable: true, length: 100 }),
    __metadata("design:type", String)
], RecruitPosts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'userId', length: 100 }),
    __metadata("design:type", String)
], RecruitPosts.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'recruitContent', nullable: true }),
    __metadata("design:type", String)
], RecruitPosts.prototype, "recruitContent", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'viewCount', nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitLocation', nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "recruitLocation", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitKeepCount', nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "recruitKeepCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        name: 'recruitCommentCount',
        nullable: true,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "recruitCommentCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        name: 'recruitDurationDays',
        nullable: true,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitPosts.prototype, "recruitDurationDays", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { name: 'endAt', nullable: true }),
    __metadata("design:type", Date)
], RecruitPosts.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecruitPosts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecruitPosts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitApplies_1.RecruitApplies, (recruitApplies) => recruitApplies.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitApplies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitComments_1.RecruitComments, (recruitComments) => recruitComments.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitKeeps_1.RecruitKeeps, (recruitKeeps) => recruitKeeps.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitKeeps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitPostImages_1.RecruitPostImages, (recruitPostImages) => recruitPostImages.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitPostImages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.recruitPosts, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], RecruitPosts.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitStacks_1.RecruitStacks, (recruitStacks) => recruitStacks.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitStacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitTasks_1.RecruitTasks, (recruitTasks) => recruitTasks.recruitPost),
    __metadata("design:type", Array)
], RecruitPosts.prototype, "recruitTasks", void 0);
RecruitPosts = __decorate([
    (0, typeorm_1.Index)('userId', ['userId'], {}),
    (0, typeorm_1.Entity)('recruitPosts')
], RecruitPosts);
exports.RecruitPosts = RecruitPosts;
//# sourceMappingURL=RecruitPosts.js.map