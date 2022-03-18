import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecruitApplies } from './RecruitApplies';
import { RecruitComments } from './RecruitComments';
import { RecruitKeeps } from './RecruitKeeps';
import { RecruitPostImages } from './RecruitPostImages';
import { Users } from '../../user/entity/Users';
import { RecruitStacks } from './RecruitStacks';
import { RecruitTasks } from './RecruitTasks';

@Index('userId', ['userId'], {})
@Entity('recruitPosts')
export class RecruitPosts {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitPostId',
    unsigned: true,
  })
  recruitPostId: number;

  @Column('varchar', { name: 'title', nullable: true, length: 100 })
  title: string | null;

  @Column('varchar', { name: 'userId', length: 100 })
  userId: string;

  @Column('text', { name: 'recruitContent', nullable: true })
  recruitContent: string | null;

  @Column('int', { name: 'viewCount', nullable: true, unsigned: true })
  viewCount: number | null;

  @Column('int', { name: 'recruitLocation', nullable: true, unsigned: true })
  recruitLocation: number | null;

  @Column('int', { name: 'recruitKeepCount', nullable: true, unsigned: true })
  recruitKeepCount: number | null;

  @Column('int', {
    name: 'recruitCommentCount',
    nullable: true,
    unsigned: true,
  })
  recruitCommentCount: number | null;

  @Column('int', {
    name: 'recruitDurationDays',
    nullable: true,
    unsigned: true,
  })
  recruitDurationDays: number | null;

  @Column('timestamp', { name: 'endAt', nullable: true })
  endAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => RecruitApplies,
    (recruitApplies) => recruitApplies.recruitPost,
  )
  recruitApplies: RecruitApplies[];

  @OneToMany(
    () => RecruitComments,
    (recruitComments) => recruitComments.recruitPost,
  )
  recruitComments: RecruitComments[];

  @OneToMany(() => RecruitKeeps, (recruitKeeps) => recruitKeeps.recruitPost)
  recruitKeeps: RecruitKeeps[];

  @OneToMany(
    () => RecruitPostImages,
    (recruitPostImages) => recruitPostImages.recruitPost,
  )
  recruitPostImages: RecruitPostImages[];

  @ManyToOne(() => Users, (users) => users.recruitPosts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: Users;

  @OneToMany(() => RecruitStacks, (recruitStacks) => recruitStacks.recruitPost)
  recruitStacks: RecruitStacks[];

  @OneToMany(() => RecruitTasks, (recruitTasks) => recruitTasks.recruitPost)
  recruitTasks: RecruitTasks[];
}
