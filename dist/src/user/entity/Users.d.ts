import { RecruitApplies } from 'src/recruitPost/entity/RecruitApplies';
import { RecruitComments } from 'src/recruitPost/entity/RecruitComments';
import { RecruitKeeps } from 'src/recruitPost/entity/RecruitKeeps';
import { RecruitPosts } from 'src/recruitPost/entity/RecruitPosts';
export declare class Users {
    userId: string;
    nickname: string | null;
    profileImgUrl: string | null;
    technologyStack: string | null;
    activityPoint: number | null;
    selfIntroduction: string | null;
    portfolioUrl: string | null;
    password: string | null;
    loginType: number | null;
    loginToken: string | null;
    isValid: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    recruitApplies: RecruitApplies[];
    recruitComments: RecruitComments[];
    recruitKeeps: RecruitKeeps[];
    recruitPosts: RecruitPosts[];
}
