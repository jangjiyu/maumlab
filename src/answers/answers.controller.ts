import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: '설문 결과 조회' })
  @Get(':answerHistoryId')
  getOne(@Param('answerHistoryId') answerHistoryId: string) {
    return this.answersService.getOne(answerHistoryId);
  }

  @Post(':questionnaireId')
  create(
    @Param('questionnaireId') questionnaireId: string,
    @Body() body: AnswerDto,
  ) {
    return this.answersService.create(questionnaireId, body);
  }

  @Put(':answerHistoryId')
  update(
    @Param('answerHistoryId') answerHistoryId: string,
    @Body() body: AnswerDto,
  ) {
    return this.answersService.update(answerHistoryId, body);
  }

  @Delete(':answerHistoryId')
  delete(@Param('answerHistoryId') answerHistoryId: string) {
    return this.answersService.delete(answerHistoryId);
  }
}
