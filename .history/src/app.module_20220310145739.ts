import { Module } from '@nestjs/common';import { AppController } from './app.controller';import { AppService } from './app.service';import { UserModule } from './user/user.module';import { RecruitPostModule } from './recruitPost/recruitPost.module';import { RecruitPostService } from './recruitPost/recruitPost.service';import { RecruitPostController } from './recruitPost/recruitPost.controller';import { InformationPostModule } from './informationPost/informationPost.module';import { AuthModule } from './auth/auth.module';import { TypeOrmModule } from '@nestjs/typeorm';import { Followers } from 'mymodel/entities/Followers';import { InformationBookmarks } from 'mymodel/entities/InformationBookmarks';import { InformationComments } from 'mymodel/entities/InformationComments';import { InformationLikes } from 'mymodel/entities/InformationLikes';import { InformationPostImages } from 'mymodel/entities/InformationPostImages';import { InformationPosts } from 'mymodel/entities/InformationPosts';import { Notification } from 'mymodel/entities/Notification';import { RecruitApplies } from 'mymodel/entities/RecruitApplies';import { RecruitBookmarks } from 'mymodel/entities/RecruitBookmarks';import { RecruitComments } from 'mymodel/entities/RecruitComments';import { RecruitPostImages } from 'mymodel/entities/RecruitPostImages';import { RecruitPosts } from 'mymodel/entities/RecruitPosts';import { RecruitStacks } from 'mymodel/entities/RecruitStacks';import { RecruitTasks } from 'mymodel/entities/RecruitTasks';import { UserReputation } from 'mymodel/entities/UserReputation';import { Users } from 'mymodel/entities/Users';@Module({  imports: [    UserModule,    RecruitPostModule,    InformationPostModule,    AuthModule,    TypeOrmModule.forRoot({      type: 'mysql',      host: 'localhost',      port: 33063,      username: 'test',      password: '1234',      database: 'test',      entities: [        Followers,        InformationBookmarks,        InformationComments,        InformationLikes,        InformationPostImages,        InformationPosts,        Notification,        RecruitApplies,        RecruitBookmarks,        RecruitComments,        RecruitPostImages,        RecruitPosts,        RecruitStacks,        RecruitTasks,        UserReputation,        Users,      ],      synchronize: true,      autoLoadEntities: true,      charset: 'utf8mb4',      logging: true,    }),  ],  controllers: [AppController, RecruitPostController],  providers: [AppService, RecruitPostService],})export class AppModule {}