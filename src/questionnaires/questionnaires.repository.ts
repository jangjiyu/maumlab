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
    return await this.Questionnaire.findOne({
      where: { id },
    });
  }

  async findByIdWithAnswerHistory(id) {
    return await this.Questionnaire.findOne({
      where: { id },
      relations: ['answerHistories'],
    });
  }

  async create(body) {
    const questionNaire = new QuestionnaireEntity();
    questionNaire.title = body.title;
    questionNaire.description = body.description;

    return await this.Questionnaire.save(questionNaire);
  }

  async update(id, body) {
    const questionNaire = await this.Questionnaire.findOne({ where: { id } });
    questionNaire.title = body.title;
    questionNaire.description = body.description;

    return await this.Questionnaire.save(questionNaire);
  }

  async delete(id) {
    return await this.Questionnaire.delete(id);
  }
}
