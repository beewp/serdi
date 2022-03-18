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
@Entity('recruitStacks')
export class RecruitStacks {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitStackId',
    unsigned: true,
  })
  recruitStackId: number;

  @Column('int', { name: 'recruitPostId', unsigned: true })
  recruitPostId: number;

  @Column('int', { name: 'recruitStack', nullable: true })
  recruitStack: number | null;

  @Column('int', { name: 'numberOfPeopleRequired', nullable: true })
  numberOfPeopleRequired: number | null;

  @Column('int', { name: 'numberOfPeopleSet', nullable: true })
  numberOfPeopleSet: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RecruitPosts, (recruitPosts) => recruitPosts.recruitStacks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;
}
