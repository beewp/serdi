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
exports.RecruitTasks = void 0;
const typeorm_1 = require("typeorm");
const RecruitPosts_1 = require("./RecruitPosts");
let RecruitTasks = class RecruitTasks {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'recruitTaskId',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitTasks.prototype, "recruitTaskId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitPostId', unsigned: true }),
    __metadata("design:type", Number)
], RecruitTasks.prototype, "recruitPostId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitTask', nullable: true }),
    __metadata("design:type", Number)
], RecruitTasks.prototype, "recruitTask", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'numberOfPeopleRequired', nullable: true }),
    __metadata("design:type", Number)
], RecruitTasks.prototype, "numberOfPeopleRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'numberOfPeopleSet', nullable: true }),
    __metadata("design:type", Number)
], RecruitTasks.prototype, "numberOfPeopleSet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecruitTasks.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecruitTasks.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecruitPosts_1.RecruitPosts, (recruitPosts) => recruitPosts.recruitTasks, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)([
        { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
    ]),
    __metadata("design:type", RecruitPosts_1.RecruitPosts)
], RecruitTasks.prototype, "recruitPost", void 0);
RecruitTasks = __decorate([
    (0, typeorm_1.Index)('recruitPostId', ['recruitPostId'], {}),
    (0, typeorm_1.Entity)('recruitTasks')
], RecruitTasks);
exports.RecruitTasks = RecruitTasks;
//# sourceMappingURL=RecruitTasks.js.map