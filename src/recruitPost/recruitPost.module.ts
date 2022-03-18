import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitApplies } from './entity/RecruitApplies';
import { RecruitKeeps } from './entity/RecruitKeeps';
import { RecruitComments } from './entity/RecruitComments';
import { RecruitPostImages } from './entity/RecruitPostImages';
import { RecruitPosts } from './entity/RecruitPosts';
import { RecruitStacks } from './entity/RecruitStacks';
import { RecruitTasks } from './entity/RecruitTasks';
import { RecruitPostController } from './recruitPost.controller';
import { RecruitPostService } from './recruitPost.service';
import { Users } from 'src/user/entity/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecruitApplies,
      RecruitKeeps,
      RecruitComments,
      RecruitPostImages,
      RecruitPosts,
      RecruitStacks,
      RecruitTasks,
      Users,
    ]),
  ],
  controllers: [RecruitPostController],
  providers: [RecruitPostService],
  exports: [RecruitPostService],
})
export class RecruitPostModule {}
