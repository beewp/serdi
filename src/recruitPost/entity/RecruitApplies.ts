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
@Index('applicant', ['applicant'], {})
@Entity('recruitApplies')
export class RecruitApplies {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitApplyId',
    unsigned: true,
  })
  recruitApplyId: number;

  @Column('int', { name: 'recruitPostId', unsigned: true })
  recruitPostId: number;

  @Column('varchar', { name: 'applicant', length: 100 })
  applicant: string;

  @Column('int', { name: 'task', nullable: true })
  task: number | null;

  @Column('varchar', { name: 'applyMessage', nullable: true, length: 100 })
  applyMessage: string | null;

  @Column('tinyint', { name: 'isAccepted', nullable: true, width: 1 })
  isAccepted: boolean | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => RecruitPosts,
    (recruitPosts) => recruitPosts.recruitApplies,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;

  @ManyToOne(() => Users, (users) => users.recruitApplies, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'applicant', referencedColumnName: 'userId' }])
  applicant2: Users;
}
