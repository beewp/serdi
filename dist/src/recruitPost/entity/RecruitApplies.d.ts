import { RecruitPosts } from './RecruitPosts';
import { Users } from '../../user/entity/Users';
export declare class RecruitApplies {
    recruitApplyId: number;
    recruitPostId: number;
    applicant: string;
    task: number | null;
    applyMessage: string | null;
    isAccepted: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    recruitPost: RecruitPosts;
    applicant2: Users;
}
