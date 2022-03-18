import { Users } from 'src/user/entity/Users';import {  Column,  Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn,} from 'typeorm';import { InformationPosts } from './InformationPosts';@Index('informationPostId', ['informationPostId'], {})@Index('userId', ['userId'], {})@Entity('informationLikes', { schema: 'test' })export class InformationLikes {  @PrimaryGeneratedColumn({    type: 'int',    name: 'informationLikeId',    unsigned: true,  })  informationLikeId: number;  @Column('varchar', { name: 'userId', length: 100 })  userId: string;  @Column('int', { name: 'informationPostId', unsigned: true })  informationPostId: number;  @Column('timestamp', {    name: 'createdAt',    nullable: true,    default: () => 'CURRENT_TIMESTAMP',  })  createdAt: Date | null;  @ManyToOne(    () => InformationPosts,    (informationPosts) => informationPosts.informationLikes,    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },  )  @JoinColumn([    { name: 'informationPostId', referencedColumnName: 'informationPostId' },  ])  informationPost: InformationPosts;  @ManyToOne(() => Users, (users) => users.informationLikes, {    onDelete: 'NO ACTION',    onUpdate: 'NO ACTION',  })  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])  user: Users;}