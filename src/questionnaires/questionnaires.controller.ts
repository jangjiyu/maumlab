import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuestionNairesService } from './questionnaires.service';
import { CreateQuestionNaireDto } from './dto/create.dto';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionNairesService: QuestionNairesService) {}

  @Get()
  getAll() {
    return this.questionNairesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.questionNairesService.getOne(id);
  }

  @Post()
  create(@Body() createQuestionNaireDto: CreateQuestionNaireDto) {
    return this.questionNairesService.create(createQuestionNaireDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionNaireDto: CreateQuestionNaireDto,
  ) {
    return this.questionNairesService.update(id, updateQuestionNaireDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionNairesService.delete(id);
  }
}
