import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecruitPostModule } from './recruitPost/recruitPost.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecruitApplies } from './recruitPost/entity/RecruitApplies';
import { RecruitComments } from './recruitPost/entity/RecruitComments';
import { RecruitPostImages } from './recruitPost/entity/RecruitPostImages';
import { Users } from './user/entity/Users';
import { RecruitTasks } from './recruitPost/entity/RecruitTasks';
import { RecruitStacks } from './recruitPost/entity/RecruitStacks';
import { RecruitPosts } from './recruitPost/entity/RecruitPosts';
import { RecruitKeeps } from './recruitPost/entity/RecruitKeeps';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RecruitPostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async () => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'development',
          entities: [
            RecruitKeeps,
            RecruitApplies,
            RecruitComments,
            RecruitPostImages,
            RecruitPosts,
            RecruitStacks,
            RecruitTasks,
            Users,
          ],
          charset: 'utf8mb4',
          logging: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
