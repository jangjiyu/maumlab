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
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnaireDto } from './dto/questionnaire.dto';

@ApiTags('Questionnaires')
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Get()
  getAll() {
    return this.questionnairesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.questionnairesService.getOne(id);
  }

  @Post()
  create(@Body() body: QuestionnaireDto) {
    this.questionnairesService.create(body);
    return 'ok';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: QuestionnaireDto) {
    this.questionnairesService.update(id, body);
    return 'ok';
  }

  // TODO: 설문지 완성 시, 설문지 완성 처리
  @Post(':id')
  complete(@Param('id') id: string) {
    // this.questionnairesService.complete(id)
    return 'ok';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.questionnairesService.delete(id);
    return 'ok';
  }
}
