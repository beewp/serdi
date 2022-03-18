"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitPostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const RecruitApplies_1 = require("./entity/RecruitApplies");
const RecruitKeeps_1 = require("./entity/RecruitKeeps");
const RecruitComments_1 = require("./entity/RecruitComments");
const RecruitPostImages_1 = require("./entity/RecruitPostImages");
const RecruitPosts_1 = require("./entity/RecruitPosts");
const RecruitStacks_1 = require("./entity/RecruitStacks");
const RecruitTasks_1 = require("./entity/RecruitTasks");
const recruitPost_controller_1 = require("./recruitPost.controller");
const recruitPost_service_1 = require("./recruitPost.service");
const Users_1 = require("../user/entity/Users");
let RecruitPostModule = class RecruitPostModule {
};
RecruitPostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                RecruitApplies_1.RecruitApplies,
                RecruitKeeps_1.RecruitKeeps,
                RecruitComments_1.RecruitComments,
                RecruitPostImages_1.RecruitPostImages,
                RecruitPosts_1.RecruitPosts,
                RecruitStacks_1.RecruitStacks,
                RecruitTasks_1.RecruitTasks,
                Users_1.Users,
            ]),
        ],
        controllers: [recruitPost_controller_1.RecruitPostController],
        providers: [recruitPost_service_1.RecruitPostService],
        exports: [recruitPost_service_1.RecruitPostService],
    })
], RecruitPostModule);
exports.RecruitPostModule = RecruitPostModule;
//# sourceMappingURL=recruitPost.module.js.map