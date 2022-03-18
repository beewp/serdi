import {  Column,  CreateDateColumn,  Entity,  Index,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne,  PrimaryGeneratedColumn,  UpdateDateColumn,} from 'typeorm';import { UserReputation } from './../../user/entity/UserReputation.entity';import { Users } from './../../user/entity/Users.entity';import { RecruitApplies } from './RecruitApplies.entity';import { RecruitComments } from './RecruitComments.entity';import { RecruitKeeps } from './RecruitKeeps.entity';import { RecruitPostImages } from './RecruitPostImages.entity';import { RecruitStacks } from './RecruitStacks.entity';import { RecruitTasks } from './RecruitTasks.entity';@Index('userId', ['userId'], {})@Entity('recruitPosts')export class RecruitPosts {  @PrimaryGeneratedColumn({    type: 'int',    name: 'recruitPostId',    unsigned: true,  })  recruitPostId: number;  @Column('varchar', { name: 'title', length: 255 })  title: string;  @Column('varchar', { name: 'userId', length: 255 })  userId: string;  @Column('text', { name: 'recruitContent' })  recruitContent: string;  @Column('int', {    name: 'viewCount',    nullable: true,    unsigned: true,    default: () => 0,  })  viewCount: number;  @Column('int', {    name: 'recruitBookmarkCount',    unsigned: true,    default: () => 0,  })  recruitBookmarkCount: number;  @Column('int', {    name: 'recruitCommentCount',    unsigned: true,    default: () => 0,  })  recruitCommentCount: number;  @Column('int', {    name: 'recruitDurationDays',    unsigned: true,  })  recruitDurationDays: number;  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })  endAt: Date;  @CreateDateColumn({    name: 'createdAt',  })  createdAt: Date;  @UpdateDateColumn({    name: 'updatedAt',  })  updatedAt: Date;  @OneToMany(    () => RecruitApplies,    (recruitApplies) => recruitApplies.RecruitPost,  )  RecruitApply: RecruitApplies[];  @OneToMany(() => RecruitKeeps, (recruitKeeps) => recruitKeeps.RecruitPost)  RecruitKeep: RecruitKeeps[];  @OneToMany(    () => RecruitComments,    (recruitComments) => recruitComments.RecruitPost,  )  RecruitComment: RecruitComments[];  @OneToMany(    () => RecruitPostImages,    (recruitPostImages) => recruitPostImages.RecruitPost,  )  RecruitPostImage: RecruitPostImages[];  @ManyToOne(() => Users, (users) => users.RecruitPost, {    onDelete: 'SET NULL',    onUpdate: 'CASCADE',  })  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])  User: Users;  @OneToOne(() => RecruitStacks, (recruitStacks) => recruitStacks.RecruitPost)  RecruitStack: RecruitStacks;  @OneToOne(() => RecruitTasks, (recruitTasks) => recruitTasks.RecruitPost)  RecruitTask: RecruitTasks;  @OneToMany(    () => UserReputation,    (userReputation) => userReputation.RecruitPost,  )  UserReputation: UserReputation[];}