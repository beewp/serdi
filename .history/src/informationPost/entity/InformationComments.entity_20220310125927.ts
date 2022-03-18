import {  Column,  CreateDateColumn,  Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn,  UpdateDateColumn,} from 'typeorm';import { Users } from './../../user/entity/Users.entity';import { InformationPosts } from './InformationPosts.entity';@Index('userId', ['userId'], {})@Index('informationPostId', ['informationPostId'], {})@Entity('informationComments')export class InformationComments {  @PrimaryGeneratedColumn({    type: 'int',    name: 'informationCommentId',    unsigned: true,  })  informationCommentId: number;  @Column('int', { name: 'commentDepth', default: () => 1 })  commentDepth: number;  @Column('int', { name: 'commentGroup' })  commentGroup: number;  @Column('varchar', { name: 'userId', length: 255 })  userId: string;  @Column('int', { name: 'informationPostId', unsigned: true })  informationPostId: number;  @Column('varchar', { name: 'informationCommentContent', length: 255 })  informationCommentContent: string;  @CreateDateColumn()  createdAt: Date;  @UpdateDateColumn()  updatedAt: Date;  @ManyToOne(() => Users, (users) => users.InformationComment, {    onDelete: 'SET NULL',    onUpdate: 'CASCADE',  })  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])  User: Users;  @ManyToOne(    () => InformationPosts,    (informationPosts) => informationPosts.InformationComment,    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },  )  @JoinColumn([    { name: 'informationPostId', referencedColumnName: 'informationPostId' },  ])  InformationPost: InformationPosts;}