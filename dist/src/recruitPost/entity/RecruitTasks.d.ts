import { RecruitPosts } from './RecruitPosts';
export declare class RecruitTasks {
    recruitTaskId: number;
    recruitPostId: number;
    recruitTask: number | null;
    numberOfPeopleRequired: number | null;
    numberOfPeopleSet: number | null;
    createdAt: Date;
    updatedAt: Date;
    recruitPost: RecruitPosts;
}
