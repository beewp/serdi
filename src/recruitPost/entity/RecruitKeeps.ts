import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecruitPosts } from './RecruitPosts';
import { Users } from '../../user/entity/Users';

@Index('recruitPostId', ['recruitPostId'], {})
@Index('userId', ['userId'], {})
@Entity('recruitKeeps')
export class RecruitKeeps {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitKeepId',
    unsigned: true,
  })
  recruitKeepId: number;

  @Column('varchar', { name: 'userId', length: 100 })
  userId: string;

  @Column('int', { name: 'recruitPostId', unsigned: true })
  recruitPostId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => RecruitPosts, (recruitPosts) => recruitPosts.recruitKeeps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;

  @ManyToOne(() => Users, (users) => users.recruitKeeps, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: Users;
}
