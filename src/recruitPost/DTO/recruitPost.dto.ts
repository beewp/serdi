import { ApiProperty } from '@nestjs/swagger';
import { RecruitStacks } from '../entity/RecruitStacks';
import { RecruitTasks } from '../entity/RecruitTasks';

//주의 사항 프로젝트 기간을 주로 받아 일로 변환해 db에 저장하기 프로젝트 종료 시간을 구하기 위해
export class RecruitPostDTO {
  @ApiProperty({
    example: '좋은 테스트 코드 짜는 방법',
    description: '타이틀',
  })
  public title: string;

  @ApiProperty({
    example: 'IT COOP 화이팅!',
    description: '글 내용',
  })
  public recruitContent: string;

  @ApiProperty({
    example: 1,
    description: '지역에 대한 번호',
  })
  public recruitLocation: number;

  @ApiProperty({
    example: 7,
    description: '프로젝트 기간 1 ~ 12',
  })
  public recruitDurationWeek: number;

  @ApiProperty({
    example: ['이미지 url1'],
    description: '프로젝트 이미지 url',
  })
  public imgUrls: string[];

  @ApiProperty({
    example: [
      {
        recruitStack: 300,
        numberOfPeopleRequired: 3,
        numberOfPeopleSet: 0,
      },
    ],
    description: '프로젝트 사용 기술',
  })
  public recruitStacks: RecruitStacks[];

  @ApiProperty({
    example: [
      { recruitTask: 3, numberOfPeopleRequired: 3, numberOfPeopleSet: 0 },
    ],
    description: '직무별 필요 인원',
  })
  public recruitTasks: RecruitTasks[];
}
