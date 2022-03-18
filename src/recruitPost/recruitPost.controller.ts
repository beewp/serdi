import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RecruitApplyDTO } from './DTO/apply.dto';
import { RecruitCommentDTO } from './DTO/recruitComment.dto';
import { RecruitPostDTO } from './DTO/recruitPost.dto';
import { RecruitApplies } from './entity/RecruitApplies';
import { RecruitComments } from './entity/RecruitComments';
import { RecruitKeeps } from './entity/RecruitKeeps';
import { RecruitPosts } from './entity/RecruitPosts';
import { RecruitStacks } from './entity/RecruitStacks';
import { RecruitTasks } from './entity/RecruitTasks';
import { RecruitPostService } from './recruitPost.service';

@ApiTags('프로젝트 게시판')
@Controller('recruit')
export class RecruitPostController {
  constructor(private recruitService: RecruitPostService) {}

  @Get()
  @ApiQuery({
    name: 'task',
    required: true,
    description: 'task',
  })
  @ApiQuery({
    name: 'order',
    required: true,
    description: 'order',
  })
  @ApiQuery({
    name: 'items',
    required: true,
    description: 'items',
  })
  @ApiQuery({
    name: 'stack',
    required: false,
    description: 'stack',
  })
  @ApiQuery({
    name: 'lastId',
    required: false,
    description: 'lastId',
  })
  @ApiOperation({ summary: '협업 게시물 전체 불러오기' })
  async getAllRecruits(@Query() query: any) {
    const userId = 'cgh';

    const order = query.order;
    const items = query.items ? query.items : 12;
    const location = query.location;
    const task = query.task;
    const stack = query.stack;
    const lastId = query.lastId;

    const recruits = await this.recruitService.ReadAllRecruits(
      userId,
      order,
      items,
      location,
      task,
      stack,
      lastId,
    );

    const post = recruits.map((item: any) => {
      const obj: any = item;
      obj.recruitDurationWeeks = recruits.recruitDurationDays / 7;
      return obj;
    });

    return post;
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '상세 협업 게시물',
  })
  @Get('/:recruitPostId')
  @ApiOperation({ summary: '협업 상세 게시물 불러오기' })
  async getDetailRecruit(
    @Param('recruitPostId', ParseIntPipe) recruitPostId: number,
  ) {
    console.log(' 컨트롤러 도착 서비스 전');

    const details: any = await this.recruitService.ReadSpecificRecruits(
      recruitPostId,
    );
    details.recruitDurationWeeks = details.recruitDurationDays / 7;
    return details;
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '상세 협업 게시물 아이디',
  })
  @Post()
  @ApiOperation({ summary: '협업 게시물 쓰기' })
  async postRecruit(@Body() body: RecruitPostDTO) {
    const userId = 'cgh';
    const recruitPost = new RecruitPosts();
    recruitPost.userId = userId;
    recruitPost.title = body.title;
    recruitPost.recruitContent = body.recruitContent;
    recruitPost.recruitLocation = body.recruitLocation;
    recruitPost.recruitDurationDays = body.recruitDurationWeek * 7;
    recruitPost.endAt = null;
    recruitPost.recruitKeepCount = 0;
    recruitPost.viewCount = 0;
    recruitPost.recruitCommentCount = 0;

    const imgUrls = body.imgUrls;
    const {
      recruitTasks,
      recruitStacks,
    }: { recruitTasks: RecruitTasks[]; recruitStacks: RecruitStacks[] } = body;

    await this.recruitService.createRecruit(
      recruitPost,
      imgUrls,
      recruitStacks,
      recruitTasks,
    );

    return { success: true };
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '상세 협업 게시물 아이디',
  })
  @ApiOperation({ summary: '협업 게시물 수정' })
  @Put('/:recruitPostId')
  modifyRecruit(
    @Param('recruitPostId', ParseIntPipe) recruitPostId,
    @Body() body: RecruitPostDTO,
  ) {
    const userId = 'test';
    const recruitPost = new RecruitPosts();
    recruitPost.userId = userId;
    recruitPost.title = body.title;
    recruitPost.recruitLocation = body.recruitLocation;
    recruitPost.recruitContent = body.recruitContent;
    recruitPost.recruitDurationDays = body.recruitDurationWeek * 7;
    recruitPost.endAt = null;

    const imgUrls = body.imgUrls;
    const recruitStacks = body.recruitStacks;
    const recruitTasks = body.recruitTasks;

    this.recruitService.updateRecruitPost(
      recruitPost,
      imgUrls,
      recruitStacks,
      recruitTasks,
    );
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '댓글 쓰기',
  })
  @ApiOperation({ summary: '협업 댓글 쓰기' })
  @Post('/:recruitPostId/comment')
  async postComment(
    @Param('recruitPostId', ParseIntPipe) recruitPostId,
    @Body() body: RecruitCommentDTO,
  ) {
    const userId = 'cgh';
    const comment = new RecruitComments();
    comment.userId = userId;
    comment.recruitPostId = recruitPostId;
    comment.commentDepth = body.commentDepth;
    comment.commentGroup = body.commentGroup;
    comment.recruitCommentContent = body.recruitCommentContent;

    await this.recruitService.createComment(recruitPostId, comment);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '협업 아이디',
  })
  @ApiParam({
    name: 'recruitCommentId',
    required: true,
    description: '댓글 아이디',
  })
  @Put('/:recruitPostId/comment/:recruitCommentId')
  @ApiOperation({ summary: '협업 댓글 수정하기' })
  async modifyComment(
    @Param('recruitPostId', ParseIntPipe) recruitPostId,
    @Param('recruitCommentId', ParseIntPipe) recruitCommentId,
    @Body() body: RecruitCommentDTO,
  ) {
    const userId = 'cgh';

    const comment = new RecruitComments();
    comment.userId = userId;
    comment.commentDepth = body.commentDepth;
    comment.commentGroup = body.commentGroup;
    comment.recruitCommentContent = body.recruitCommentContent;

    await this.recruitService.updateComment(recruitCommentId, comment);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '포스트 아이디',
  })
  @ApiOperation({ summary: '협업 신청하기' })
  @Post('/:recruitPostId/apply')
  async postApply(
    @Param('recruitPostId', ParseIntPipe) recruitPostId: number,
    @Body() body: RecruitApplyDTO,
  ) {
    const userId = 'cgh';
    const apply = new RecruitApplies();
    apply.applicant = userId;
    apply.recruitPostId = recruitPostId;
    apply.applyMessage = body.applyMessage;
    apply.task = body.task;
    apply.isAccepted = false;

    await this.recruitService.createApply(apply);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '포스트 아이디',
  })
  @ApiOperation({ summary: '협업 keep하기' })
  @Post('/:recruitPostId/keepIt')
  async postKeepIt(@Param('recruitPostId', ParseIntPipe) recruitId) {
    const userId = 'cgh';
    const recruitKeepIt = new RecruitKeeps();
    recruitKeepIt.userId = userId;
    recruitKeepIt.recruitPostId = recruitId;

    this.recruitService.createKeepIt(recruitKeepIt);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitPostId',
    required: true,
    description: '포스트 아이디',
  })
  @ApiOperation({ summary: '협업 신청 취소하기' })
  @Delete('/:recruitPostId/:applyId')
  async removeApply(@Param('applyId', ParseIntPipe) applyId: number) {
    this.recruitService.deleteApply(applyId);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitKeepId',
    required: true,
    description: '킵잇 아이디',
  })
  @ApiOperation({ summary: '협업 keep취소하기' })
  @Delete('/:recruitKeepId')
  async removeKeepIt(@Param('recruitKeepId', ParseIntPipe) keepId: number) {
    this.recruitService.deleteKeepIt(keepId);

    return { success: true };
  }

  @ApiParam({
    name: 'recruitCommentId',
    required: true,
    description: '댓글 아이디',
  })
  @ApiOperation({ summary: '협업 댓글 삭제하기' })
  @Delete('/:recruitCommentId')
  async removeComment(
    @Param('recruitCommentId', ParseIntPipe) commentId: number,
  ) {
    this.recruitService.deleteComment(commentId);

    return { success: true };
  }
}
