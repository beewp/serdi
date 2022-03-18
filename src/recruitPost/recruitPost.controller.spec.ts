import { Test, TestingModule } from '@nestjs/testing';
import { RecruitPostController } from './recruitPost.controller';

describe('RecruitPostController', () => {
  let controller: RecruitPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitPostController],
    }).compile();

    controller = module.get<RecruitPostController>(RecruitPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
