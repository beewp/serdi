import { RecruitPosts } from './RecruitPosts';
import { Users } from '../../user/entity/Users';
export declare class RecruitComments {
    recruitCommentId: number;
    commentDepth: number | null;
    commentGroup: number | null;
    userId: string;
    recruitPostId: number;
    recruitCommentContent: string | null;
    createdAt: Date;
    updatedAt: Date;
    recruitPost: RecruitPosts;
    user: Users;
}
