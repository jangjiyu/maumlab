import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class NestedItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'questionnaireId',
  })
  public id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    example: [1, 3],
    description: '답변 항목의 questionItemId 배열',
  })
  public questionItems: string;
}

export class AnswerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedItemDto)
  readonly answerArray: NestedItemDto[];
}
