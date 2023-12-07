import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class NestedItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '보기 문항 번호',
  })
  public orderIndex: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '아니오(8번 문항으로 이동해 주십시오.)',
    description: '보기 문항 내용',
  })
  public itemName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: '해당 보기 문항에 대한 점수',
  })
  public score: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: '해당 보기 문항 선택 시 다른 설문 문항으로 이동하는지 여부',
  })
  public isSkipLogicItem: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 8,
    description: '해당 보기 문항 선택 시 이동할 설문 문항의 번호(orderIndex)',
  })
  public orderIndexToSkip: number | null;
}

export class QuestionItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedItemDto)
  readonly questionItemArray: NestedItemDto[];
}
