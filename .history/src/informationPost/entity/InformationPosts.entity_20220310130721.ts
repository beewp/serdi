import {  Column,  Entity,  Index,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn,} from 'typeorm';import { Users } from '../../user/entity/Users.entity';import { InformationComments } from './InformationComments.entity';import { InformationKeeps } from './InformationKeeps.entity';import { InformationLoves } from './InformationLoves.entity';import { InformationPostImages } from './InformationPostImages.entity';@Index('userId', ['userId'], {})@Entity('informationPosts')export class InformationPosts {  @PrimaryGeneratedColumn({    type: 'int',    name: 'informationPostId',    unsigned: true,  })  informationPostId: number;  @Column('varchar', { name: 'title', length: 255 })  title: string;  @Column('varchar', { name: 'userId', length: 255 })  userId: string;  @Column('text', { name: 'informationContent' })  informationContent: string;  @Column('int', {    name: 'informationBookmarkCount',    nullable: true,    default: () => "'0'",  })  informationBookmarkCount: number;  @Column('int', {    name: 'informationLikeCount',    nullable: true,    default: () => "'0'",  })  informationLikeCount: number;  @Column('int', {    name: 'informationCommentCount',    nullable: true,    unsigned: true,    default: () => "'0'",  })  informationCommentCount: number;  @Column('int', {    name: 'viewCount',    nullable: true,    unsigned: true,    default: () => "'0'",  })  viewCount: number;  @Column('timestamp', {    name: 'createdAt',    default: () => 'CURRENT_TIMESTAMP',  })  createdAt: Date;  @Column('timestamp', {    name: 'updatedAt',    default: () => 'CURRENT_TIMESTAMP',  })  updatedAt: Date;  @OneToMany(    () => InformationKeeps,    (informationKeeps) => informationKeeps.InformationPost,  )  InformationKeep: InformationKeeps[];  @OneToMany(    () => InformationComments,    (informationComments) => informationComments.InformationPost,  )  InformationComment: InformationComments[];  @OneToMany(    () => InformationLoves,    (informationLoves) => informationLoves.InformationPost,  )  InformationLove: InformationLoves[];  @OneToMany(    () => InformationPostImages,    (informationPostImages) => informationPostImages.InformationPost,  )  InformationPostImage: InformationPostImages[];  @ManyToOne(() => Users, (users) => users.InformationPost, {    onDelete: 'SET NULL',    onUpdate: 'CASCADE',  })  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])  User: Users;}