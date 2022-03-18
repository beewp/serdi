import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecruitPosts } from './RecruitPosts';
import { Users } from '../../user/entity/Users';

@Index('recruitPostId', ['recruitPostId'], {})
@Index('userId', ['userId'], {})
@Entity('recruitComments')
export class RecruitComments {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitCommentId',
    unsigned: true,
  })
  recruitCommentId: number;

  @Column('int', { name: 'commentDepth', nullable: true })
  commentDepth: number | null;

  @Column('int', { name: 'commentGroup', nullable: true })
  commentGroup: number | null;

  @Column('varchar', { name: 'userId', length: 100 })
  userId: string;

  @Column('int', { name: 'recruitPostId', unsigned: true })
  recruitPostId: number;

  @Column('varchar', {
    name: 'recruitCommentContent',
    nullable: true,
    length: 100,
  })
  recruitCommentContent: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => RecruitPosts,
    (recruitPosts) => recruitPosts.recruitComments,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;

  @ManyToOne(() => Users, (users) => users.recruitComments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: Users;
}
