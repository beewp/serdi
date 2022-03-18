import { RecruitApplyDTO } from './DTO/apply.dto';
import { RecruitCommentDTO } from './DTO/recruitComment.dto';
import { RecruitPostDTO } from './DTO/recruitPost.dto';
import { RecruitPostService } from './recruitPost.service';
export declare class RecruitPostController {
    private recruitService;
    constructor(recruitService: RecruitPostService);
    getAllRecruits(query: any): Promise<any>;
    getDetailRecruit(recruitPostId: number): Promise<any>;
    postRecruit(body: RecruitPostDTO): Promise<{
        success: boolean;
    }>;
    modifyRecruit(recruitPostId: any, body: RecruitPostDTO): void;
    postComment(recruitPostId: any, body: RecruitCommentDTO): Promise<{
        success: boolean;
    }>;
    modifyComment(recruitPostId: any, recruitCommentId: any, body: RecruitCommentDTO): Promise<{
        success: boolean;
    }>;
    postApply(recruitPostId: number, body: RecruitApplyDTO): Promise<{
        success: boolean;
    }>;
    postKeepIt(recruitId: any): Promise<{
        success: boolean;
    }>;
    removeApply(applyId: number): Promise<{
        success: boolean;
    }>;
    removeKeepIt(keepId: number): Promise<{
        success: boolean;
    }>;
    removeComment(commentId: number): Promise<{
        success: boolean;
    }>;
}
