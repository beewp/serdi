import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RecruitApplies } from '../recruitPost/entity/RecruitApplies';
import { RecruitKeeps } from '../recruitPost/entity/RecruitKeeps';
import { RecruitComments } from '../recruitPost/entity/RecruitComments';
import { RecruitPosts } from '../recruitPost/entity/RecruitPosts';
import { RecruitStacks } from '../recruitPost/entity/RecruitStacks';
import { RecruitTasks } from '../recruitPost/entity/RecruitTasks';
import { Users } from './entity/Users';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecruitKeeps,
      RecruitApplies,
      RecruitComments,
      RecruitPosts,
      RecruitStacks,
      RecruitTasks,
      Users,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
