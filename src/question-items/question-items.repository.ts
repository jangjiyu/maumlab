import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionItemEntity } from './question-items.entity';
import { QuestionEntity } from 'src/questions/questions.entity';
import { QuestionnaireEntity } from 'src/questionnaires/questionnaires.entity';

@Injectable()
export class QuestionItemsRepository {
  constructor(
    @InjectRepository(QuestionItemEntity)
    private readonly QuestionItem: Repository<QuestionItemEntity>,
    @InjectRepository(QuestionEntity)
    private readonly Question: Repository<QuestionEntity>,
    @InjectRepository(QuestionnaireEntity)
    private readonly Questionnaire: Repository<QuestionnaireEntity>,
  ) {}

  async findAllByQuestionId(questionId) {
    return await this.Question.findOne({
      where: { id: questionId },
      relations: ['questionItems'],
      order: { questionItems: { orderIndex: 'ASC' } },
    });
  }

  async create(qustionnaireId, questionId, body) {
    const question = await this.Question.findOne({
      where: { id: questionId },
      relations: ['questionItems'],
    });

    if (question.questionItems.length > 0)
      await this.QuestionItem.remove(question.questionItems);

    body.forEach((item) => {
      this.QuestionItem.save({
        ...item,
        question: { id: questionId },
        questionnaire: { id: qustionnaireId },
      });
    });
  }

  async delete(questionId) {
    return await this.QuestionItem.delete({ question: { id: questionId } });
  }
}
