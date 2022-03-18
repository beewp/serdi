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
exports.RecruitCommentDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecruitCommentDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ㅋㅋㅋㅋ ㅇㅈ이지 저건',
        description: '댓글 내용',
    }),
    __metadata("design:type", String)
], RecruitCommentDTO.prototype, "recruitCommentContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: '댓글 or 대댓글',
    }),
    __metadata("design:type", Number)
], RecruitCommentDTO.prototype, "commentDepth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: '1번 댓글의 대댓글이면 댓글 그룹',
    }),
    __metadata("design:type", Number)
], RecruitCommentDTO.prototype, "commentGroup", void 0);
exports.RecruitCommentDTO = RecruitCommentDTO;
//# sourceMappingURL=recruitComment.dto.js.map