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
exports.RecruitComments = void 0;
const typeorm_1 = require("typeorm");
const RecruitPosts_1 = require("./RecruitPosts");
const Users_1 = require("../../user/entity/Users");
let RecruitComments = class RecruitComments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'recruitCommentId',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitComments.prototype, "recruitCommentId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'commentDepth', nullable: true }),
    __metadata("design:type", Number)
], RecruitComments.prototype, "commentDepth", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'commentGroup', nullable: true }),
    __metadata("design:type", Number)
], RecruitComments.prototype, "commentGroup", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'userId', length: 100 }),
    __metadata("design:type", String)
], RecruitComments.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitPostId', unsigned: true }),
    __metadata("design:type", Number)
], RecruitComments.prototype, "recruitPostId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'recruitCommentContent',
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], RecruitComments.prototype, "recruitCommentContent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecruitComments.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecruitComments.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecruitPosts_1.RecruitPosts, (recruitPosts) => recruitPosts.recruitComments, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
    ]),
    __metadata("design:type", RecruitPosts_1.RecruitPosts)
], RecruitComments.prototype, "recruitPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.recruitComments, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], RecruitComments.prototype, "user", void 0);
RecruitComments = __decorate([
    (0, typeorm_1.Index)('recruitPostId', ['recruitPostId'], {}),
    (0, typeorm_1.Index)('userId', ['userId'], {}),
    (0, typeorm_1.Entity)('recruitComments')
], RecruitComments);
exports.RecruitComments = RecruitComments;
//# sourceMappingURL=RecruitComments.js.map