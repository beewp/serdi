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
exports.RecruitPostDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecruitPostDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '좋은 테스트 코드 짜는 방법',
        description: '타이틀',
    }),
    __metadata("design:type", String)
], RecruitPostDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'IT COOP 화이팅!',
        description: '글 내용',
    }),
    __metadata("design:type", String)
], RecruitPostDTO.prototype, "recruitContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '지역에 대한 번호',
    }),
    __metadata("design:type", Number)
], RecruitPostDTO.prototype, "recruitLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 7,
        description: '프로젝트 기간 1 ~ 12',
    }),
    __metadata("design:type", Number)
], RecruitPostDTO.prototype, "recruitDurationWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['이미지 url1'],
        description: '프로젝트 이미지 url',
    }),
    __metadata("design:type", Array)
], RecruitPostDTO.prototype, "imgUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                recruitStack: 300,
                numberOfPeopleRequired: 3,
                numberOfPeopleSet: 0,
            },
        ],
        description: '프로젝트 사용 기술',
    }),
    __metadata("design:type", Array)
], RecruitPostDTO.prototype, "recruitStacks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { recruitTask: 3, numberOfPeopleRequired: 3, numberOfPeopleSet: 0 },
        ],
        description: '직무별 필요 인원',
    }),
    __metadata("design:type", Array)
], RecruitPostDTO.prototype, "recruitTasks", void 0);
exports.RecruitPostDTO = RecruitPostDTO;
//# sourceMappingURL=recruitPost.dto.js.map