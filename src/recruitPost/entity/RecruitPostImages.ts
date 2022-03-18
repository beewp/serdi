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
@Entity('recruitPostImages')
export class RecruitPostImages {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'recruitPostImageId',
    unsigned: true,
  })
  recruitPostImageId: number;

  @Column('int', { name: 'recruitPostId', nullable: true, unsigned: true })
  recruitPostId: number | null;

  @Column('varchar', { name: 'imgUrl', nullable: true, length: 100 })
  imgUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => RecruitPosts,
    (recruitPosts) => recruitPosts.recruitPostImages,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'recruitPostId', referencedColumnName: 'recruitPostId' },
  ])
  recruitPost: RecruitPosts;
}
