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
exports.RecruitPostImages = void 0;
const typeorm_1 = require("typeorm");
const RecruitPosts_1 = require("./RecruitPosts");
let RecruitPostImages = class RecruitPostImages {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'recruitPostImageId',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], RecruitPostImages.prototype, "recruitPostImageId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'recruitPostId', nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], RecruitPostImages.prototype, "recruitPostId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'imgUrl', nullable: true, length: 100 }),
    __metadata("design:type", String)
], RecruitPostImages.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecruitPostImages.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecruitPostImages.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecruitPosts_1.RecruitPosts, (recruitPosts) => recruitPosts.recruitPostImages, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
    ]),
    __metadata("design:type", RecruitPosts_1.RecruitPosts)
], RecruitPostImages.prototype, "recruitPost", void 0);
RecruitPostImages = __decorate([
    (0, typeorm_1.Index)('recruitPostId', ['recruitPostId'], {}),
    (0, typeorm_1.Entity)('recruitPostImages')
], RecruitPostImages);
exports.RecruitPostImages = RecruitPostImages;
//# sourceMappingURL=RecruitPostImages.js.map