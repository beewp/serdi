import { Module } from '@nestjs/common';import { AppController } from './app.controller';import { AppService } from './app.service';import { UserModule } from './user/user.module';import { RecruitPostModule } from './recruitPost/recruitPost.module';import { RecruitPostService } from './recruitPost/recruitPost.service';import { RecruitPostController } from './recruitPost/recruitPost.controller';import { InformationPostModule } from './informationPost/informationPost.module';import { AuthModule } from './auth/auth.module';import { TypeOrmModule } from '@nestjs/typeorm';import { ConfigModule, ConfigService } from '@nestjs/config';@Module({  imports: [    ConfigModule.forRoot({ isGlobal: true }),    UserModule,    RecruitPostModule,    InformationPostModule,    AuthModule,    TypeOrmModule.forRootAsync({      inject: [ConfigService],      useFactory: async (configService: ConfigService) => {        return {          type: 'mysql',          host: 'localhost',          port: 3306,          username: configService.get('DB_USERNAME'),          password: configService.get('DB_PASSWORD'),          database: configService.get('DB_DATABASE'),          entities: [            Followers,            InformationBookmarks,            InformationComments,            InformationLikes,            InformationPostImages,            InformationPosts,            Notification,            RecruitApplies,            RecruitBookmarks,            RecruitComments,            RecruitPostImages,            RecruitPosts,            RecruitStacks,            RecruitTasks,            UserReputation,            Users,          ],          synchronize: true,          autoLoadEntities: true,          charset: 'utf8mb4',          logging: true,        };      },    }),  ],  controllers: [AppController, RecruitPostController],  providers: [AppService, RecruitPostService, ConfigService],})export class AppModule {}