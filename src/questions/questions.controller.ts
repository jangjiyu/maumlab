import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/question.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get(':questionnaireId')
  getAll(@Param('questionnaireId') questionnaireId: string) {
    return this.questionsService.getAll(questionnaireId);
  }

  @Post(':questionnaireId')
  create(
    @Param('questionnaireId') questionnaireId: string,
    @Body() body: QuestionDto,
  ) {
    return this.questionsService.create(questionnaireId, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: QuestionDto) {
    return this.questionsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionsService.delete(id);
  }
}
