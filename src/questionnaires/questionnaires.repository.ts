import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionnaireEntity } from './questionnaires.entity';

@Injectable()
export class QuestionnairesRepository {
  constructor(
    @InjectRepository(QuestionnaireEntity)
    private readonly Questionnaire: Repository<QuestionnaireEntity>,
  ) {}

  async findAll() {
    return await this.Questionnaire.find();
  }

  async findById(id) {
    return await this.Questionnaire.findOne(id);
  }

  async create(createQuestionNaireDto) {
    const questionNaire = new QuestionnaireEntity();
    questionNaire.title = createQuestionNaireDto.title;
    questionNaire.description = createQuestionNaireDto.description;
    questionNaire.isMultipleChoiceQuestion =
      createQuestionNaireDto.isMultipleChoiceQuestion;

    return await this.Questionnaire.save(questionNaire);
  }

  async update(id, updateQuestionNaireDto) {
    const questionNaire = await this.Questionnaire.findOne(id);
    questionNaire.title = updateQuestionNaireDto.title;
    questionNaire.description = updateQuestionNaireDto.description;
    questionNaire.isMultipleChoiceQuestion =
      updateQuestionNaireDto.isMultipleChoiceQuestion;

    return await this.Questionnaire.save(questionNaire);
  }

  async delete(id) {
    return await this.Questionnaire.delete(id);
  }
}
