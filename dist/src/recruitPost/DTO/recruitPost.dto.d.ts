import { RecruitStacks } from '../entity/RecruitStacks';
import { RecruitTasks } from '../entity/RecruitTasks';
export declare class RecruitPostDTO {
    title: string;
    recruitContent: string;
    recruitLocation: number;
    recruitDurationWeek: number;
    imgUrls: string[];
    recruitStacks: RecruitStacks[];
    recruitTasks: RecruitTasks[];
}
