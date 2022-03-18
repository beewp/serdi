import {  Column,  Entity,  Index,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne,  PrimaryGeneratedColumn,} from "typeorm";import { RecruitApplies } from "./RecruitApplies";import { RecruitBookmarks } from "./RecruitBookmarks";import { RecruitComments } from "./RecruitComments";import { Users } from "./Users";import { RecruitStacks } from "./RecruitStacks";import { RecruitTasks } from "./RecruitTasks";import { UserReputation } from "./UserReputation";@Index("userId", ["userId"], {})@Entity("recruitPosts", { schema: "test" })export class RecruitPosts {  @PrimaryGeneratedColumn({    type: "int",    name: "recruitPostId",    unsigned: true,  })  recruitPostId: number;  @Column("varchar", { name: "title", nullable: true, length: 100 })  title: string | null;  @Column("varchar", { name: "userId", length: 100 })  userId: string;  @Column("text", { name: "recruitContent", nullable: true })  recruitContent: string | null;  @Column("int", { name: "viewCount", nullable: true, unsigned: true })  viewCount: number | null;  @Column("int", {    name: "recruitBookmarkCount",    nullable: true,    unsigned: true,  })  recruitBookmarkCount: number | null;  @Column("int", {    name: "recruitCommentCount",    nullable: true,    unsigned: true,  })  recruitCommentCount: number | null;  @Column("int", {    name: "recruitDurationDays",    nullable: true,    unsigned: true,  })  recruitDurationDays: number | null;  @Column("timestamp", { name: "endAt", nullable: true })  endAt: Date | null;  @Column("timestamp", {    name: "createdAt",    nullable: true,    default: () => "CURRENT_TIMESTAMP",  })  createdAt: Date | null;  @Column("timestamp", {    name: "updatedAt",    nullable: true,    default: () => "CURRENT_TIMESTAMP",  })  updatedAt: Date | null;  @OneToMany(    () => RecruitApplies,    (recruitApplies) => recruitApplies.recruitPost  )  recruitApplies: RecruitApplies[];  @OneToMany(    () => RecruitBookmarks,    (recruitBookmarks) => recruitBookmarks.recruitPost  )  recruitBookmarks: RecruitBookmarks[];  @OneToMany(    () => RecruitComments,    (recruitComments) => recruitComments.recruitPost  )  recruitComments: RecruitComments[];  @ManyToOne(() => Users, (users) => users.recruitPosts, {    onDelete: "NO ACTION",    onUpdate: "NO ACTION",  })  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])  user: Users;  @OneToOne(() => RecruitStacks, (recruitStacks) => recruitStacks.recruitPost)  recruitStacks: RecruitStacks;  @OneToOne(() => RecruitTasks, (recruitTasks) => recruitTasks.recruitPost)  recruitTasks: RecruitTasks;  @OneToMany(    () => UserReputation,    (userReputation) => userReputation.recruitPost  )  userReputations: UserReputation[];}