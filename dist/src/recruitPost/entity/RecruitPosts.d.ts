import { RecruitApplies } from './RecruitApplies';
import { RecruitComments } from './RecruitComments';
import { RecruitKeeps } from './RecruitKeeps';
import { RecruitPostImages } from './RecruitPostImages';
import { Users } from '../../user/entity/Users';
import { RecruitStacks } from './RecruitStacks';
import { RecruitTasks } from './RecruitTasks';
export declare class RecruitPosts {
    recruitPostId: number;
    title: string | null;
    userId: string;
    recruitContent: string | null;
    viewCount: number | null;
    recruitLocation: number | null;
    recruitKeepCount: number | null;
    recruitCommentCount: number | null;
    recruitDurationDays: number | null;
    endAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    recruitApplies: RecruitApplies[];
    recruitComments: RecruitComments[];
    recruitKeeps: RecruitKeeps[];
    recruitPostImages: RecruitPostImages[];
    user: Users;
    recruitStacks: RecruitStacks[];
    recruitTasks: RecruitTasks[];
}
