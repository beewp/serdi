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
exports.Users = void 0;
const RecruitApplies_1 = require("../../recruitPost/entity/RecruitApplies");
const RecruitComments_1 = require("../../recruitPost/entity/RecruitComments");
const RecruitKeeps_1 = require("../../recruitPost/entity/RecruitKeeps");
const RecruitPosts_1 = require("../../recruitPost/entity/RecruitPosts");
const typeorm_1 = require("typeorm");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.Column)('varchar', { primary: true, name: 'userId', length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'nickname', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'profileImgUrl', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "profileImgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'technologyStack', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "technologyStack", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'activityPoint', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "activityPoint", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'selfIntroduction', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "selfIntroduction", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'portfolioUrl', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "portfolioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'loginType', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "loginType", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'loginToken', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "loginToken", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'isValid', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Users.prototype, "isValid", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitApplies_1.RecruitApplies, (recruitApplies) => recruitApplies.applicant2),
    __metadata("design:type", Array)
], Users.prototype, "recruitApplies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitComments_1.RecruitComments, (recruitComments) => recruitComments.user),
    __metadata("design:type", Array)
], Users.prototype, "recruitComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitKeeps_1.RecruitKeeps, (recruitKeeps) => recruitKeeps.user),
    __metadata("design:type", Array)
], Users.prototype, "recruitKeeps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecruitPosts_1.RecruitPosts, (recruitPosts) => recruitPosts.user),
    __metadata("design:type", Array)
], Users.prototype, "recruitPosts", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)('users', { schema: 'development' })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map