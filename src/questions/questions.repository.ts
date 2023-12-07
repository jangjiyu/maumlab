import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './questions.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly Question: Repository<QuestionEntity>,
    @InjectRepository(QuestionnaireEntity)
    private readonly Questionnaire: Repository<QuestionnaireEntity>,
  ) {}

  async findAllByQuestionnaireId(questionnaireId) {
    return await this.Questionnaire.findOne({
      where: { id: questionnaireId },
      relations: ['questions', 'questions.questionItems'],
      order: {
        questions: { orderIndex: 'ASC', questionItems: { orderIndex: 'ASC' } },
      },
    });
  }

  async findQuestionnaire(questionnaireId) {
    return await this.Questionnaire.findOne({
      where: { id: questionnaireId },
    });
  }

  async findWithAnswerHistory(id) {
    return await this.Questionnaire.findOne({
      where: { id },
      relations: ['answerHistories'],
    });
  }

  async create(questionnaireId, body) {
    console.log(questionnaireId, body);
    await this.Question.save({
      ...body,
      questionnaire: { id: questionnaireId },
    });
  }

  async update(id, body) {
    const question = await this.Question.findOne({ where: { id } });
    question.orderIndex = body.orderIndex;
    question.questionName = body.questionName;
    question.isMultipleChoiceQuestion = body.isMultipleChoiceQuestion;

    return await this.Question.save(question);
  }

  async delete(id) {
    return await this.Question.delete(id);
  }
}
