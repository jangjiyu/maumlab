import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionItemsService } from './question-items.service';
import { QuestionItemDto } from './dto/question-item.dto';

@ApiTags('QuestionItems')
@Controller('question-items')
export class QuestionItemsController {
  constructor(private readonly questionItemsService: QuestionItemsService) {}

  @Get(':questionId')
  getAll(@Param('questionId') questionId: string) {
    return this.questionItemsService.getAll(questionId);
  }

  @Post(':questionnaireId/:questionId')
  create(
    @Param('questionnaireId') questionnaireId: string,
    @Param('questionId') questionId: string,
    @Body() body: QuestionItemDto,
  ) {
    return this.questionItemsService.create(questionnaireId, questionId, body);
  }

  @Put(':questionnaireId/:questionId')
  update(
    @Param('questionnaireId') questionnaireId: string,
    @Param('questionId') questionId: string,
    @Body() body: QuestionItemDto,
  ) {
    return this.questionItemsService.update(questionnaireId, questionId, body);
  }

  // 해당 문제의 보기 모두 삭제
  @Delete(':questionId')
  delete(@Param('questionId') questionId: string) {
    return this.questionItemsService.delete(questionId);
  }
}
