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
exports.RecruitApplies = void 0;
const typeorm_1 = require("typeorm");
const RecruitPosts_1 = require("./RecruitPosts");
const Users_1 = require("../../user/entity/Users");
let RecruitApplies = class RecruitApplies {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'recruitApplyId',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitApplies.prototype, "recruitApplyId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitPostId', unsigned: true }),
    __metadata("design:type", Number)
], RecruitApplies.prototype, "recruitPostId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'applicant', length: 100 }),
    __metadata("design:type", String)
], RecruitApplies.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'task', nullable: true }),
    __metadata("design:type", Number)
], RecruitApplies.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'applyMessage', nullable: true, length: 100 }),
    __metadata("design:type", String)
], RecruitApplies.prototype, "applyMessage", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { name: 'isAccepted', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], RecruitApplies.prototype, "isAccepted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecruitApplies.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecruitApplies.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecruitPosts_1.RecruitPosts, (recruitPosts) => recruitPosts.recruitApplies, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
    ]),
    __metadata("design:type", RecruitPosts_1.RecruitPosts)
], RecruitApplies.prototype, "recruitPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.recruitApplies, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'applicant', referencedColumnName: 'userId' }]),
    __metadata("design:type", Users_1.Users)
], RecruitApplies.prototype, "applicant2", void 0);
RecruitApplies = __decorate([
    (0, typeorm_1.Index)('recruitPostId', ['recruitPostId'], {}),
    (0, typeorm_1.Index)('applicant', ['applicant'], {}),
    (0, typeorm_1.Entity)('recruitApplies')
], RecruitApplies);
exports.RecruitApplies = RecruitApplies;
//# sourceMappingURL=RecruitApplies.js.map