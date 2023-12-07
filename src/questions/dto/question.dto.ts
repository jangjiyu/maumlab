import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '설문 문항 번호',
  })
  public orderIndex: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '당신은 다가올 휴가 때 해외 여행을 희망하시나요?',
    description: '설문 문항 내용',
  })
  public questionName: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: '복수 선택 가능 여부를 true/false로 표시',
  })
  public isMultipleChoiceQuestion: boolean;
}
