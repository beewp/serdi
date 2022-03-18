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

@Index('recruitPostId', ['recruitPostId'], {})
@Entity('recruitTasks')
export class RecruitTasks {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitTaskId',
    unsigned: true,
  })
  recruitTaskId: number;

  @Column('int', { name: 'recruitPostId', unsigned: true })
  recruitPostId: number;

  @Column('int', { name: 'recruitTask', nullable: true })
  recruitTask: number | null;

  @Column('int', { name: 'numberOfPeopleRequired', nullable: true })
  numberOfPeopleRequired: number | null;

  @Column('int', { name: 'numberOfPeopleSet', nullable: true })
  numberOfPeopleSet: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RecruitPosts, (recruitPosts) => recruitPosts.recruitTasks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;
}
