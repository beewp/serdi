import { RecruitApplies } from 'src/recruitPost/entity/RecruitApplies';
import { RecruitComments } from 'src/recruitPost/entity/RecruitComments';
import { RecruitKeeps } from 'src/recruitPost/entity/RecruitKeeps';
import { RecruitPosts } from 'src/recruitPost/entity/RecruitPosts';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users', { schema: 'development' })
export class Users {
  @Column('varchar', { primary: true, name: 'userId', length: 100 })
  userId: string;

  @Column('varchar', { name: 'nickname', nullable: true, length: 100 })
  nickname: string | null;

  @Column('varchar', { name: 'profileImgUrl', nullable: true, length: 100 })
  profileImgUrl: string | null;

  @Column('varchar', { name: 'technologyStack', nullable: true, length: 100 })
  technologyStack: string | null;

  @Column('int', { name: 'activityPoint', nullable: true })
  activityPoint: number | null;

  @Column('varchar', { name: 'selfIntroduction', nullable: true, length: 100 })
  selfIntroduction: string | null;

  @Column('varchar', { name: 'portfolioUrl', nullable: true, length: 100 })
  portfolioUrl: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 100 })
  password: string | null;

  @Column('int', { name: 'loginType', nullable: true })
  loginType: number | null;

  @Column('varchar', { name: 'loginToken', nullable: true, length: 100 })
  loginToken: string | null;

  @Column('tinyint', { name: 'isValid', nullable: true, width: 1 })
  isValid: boolean | null;

  @Column('timestamp', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(
    () => RecruitApplies,
    (recruitApplies) => recruitApplies.applicant2,
  )
  recruitApplies: RecruitApplies[];

  @OneToMany(() => RecruitComments, (recruitComments) => recruitComments.user)
  recruitComments: RecruitComments[];

  @OneToMany(() => RecruitKeeps, (recruitKeeps) => recruitKeeps.user)
  recruitKeeps: RecruitKeeps[];

  @OneToMany(() => RecruitPosts, (recruitPosts) => recruitPosts.user)
  recruitPosts: RecruitPosts[];
}
