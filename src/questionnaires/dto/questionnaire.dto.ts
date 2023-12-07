import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class QuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '휴가 때 가고 싶은 해외여행',
    description: '설문지 이름',
  })
  public title: string;

  @IsArray()
  @ApiProperty({
    example:
      '본 설문은 다가올 휴가 동안에 가고 싶은 해외여행에 대한 의견을 묻는 설문입니다.',
    description: '설문지 설명',
  })
  public description: string;
}
