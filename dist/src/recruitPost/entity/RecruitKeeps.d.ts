import { RecruitPosts } from './RecruitPosts';
import { Users } from '../../user/entity/Users';
export declare class RecruitKeeps {
    recruitKeepId: number;
    userId: string;
    recruitPostId: number;
    createdAt: Date;
    recruitPost: RecruitPosts;
    user: Users;
}
