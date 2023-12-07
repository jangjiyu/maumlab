import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from './answers.entity';
import { AnswerHistoryEntity } from '../answer-histories/answer-histories.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';

@Injectable()
export class AnswersRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly Answer: Repository<AnswerEntity>,
    @InjectRepository(AnswerHistoryEntity)
    private readonly AnswerHistory: Repository<AnswerHistoryEntity>,
    @InjectRepository(QuestionnaireEntity)
    private readonly Questionnaire: Repository<QuestionnaireEntity>,
  ) {}

  async findAnswerById(id) {
    return await this.AnswerHistory.findOne({
      where: { id },
      relations: ['answers'],
    });
  }

  async findQuestionnaireInfo(questionnaireId) {
    return await this.Questionnaire.findOne({
      where: { id: questionnaireId, isCompleted: true },
      relations: ['questions', 'questions.questionItems'],
      order: {
        questions: { orderIndex: 'ASC', questionItems: { orderIndex: 'ASC' } },
      },
    });
  }

  async create(questionnaireId, score, validatedAnswer) {
    const answerHistory = await this.AnswerHistory.save({
      questionnaire: { id: questionnaireId },
      score,
    });

    validatedAnswer.forEach((answer) => {
      return this.Answer.save({
        orderIndex: answer.orderIndex,
        question: { id: answer.questionId },
        questionItem: { id: answer.questionItemId },
        questionnaire: { id: questionnaireId },
        answerHistory: { id: answerHistory.id },
      });
    });

    return;
  }

  async update(answerHistoryId, score, validatedAnswer) {
    const answerHistory = await this.AnswerHistory.findOne({
      where: { id: answerHistoryId },
      relations: ['answers'],
    });
    answerHistory.score = score;
    this.AnswerHistory.save(answerHistory);
    this.Answer.remove(answerHistory.answers);

    validatedAnswer.forEach((answer) => {
      this.Answer.save({
        orderIndex: answer.orderIndex,
        question: { id: answer.questionId },
        questionItem: { id: answer.questionItemId },
        questionnaire: { id: answer.questionnaireId },
        answerHistory: { id: answerHistory.id },
      });
    });
  }

  async delete(answerHistoryId) {
    return await this.AnswerHistory.delete(answerHistoryId);
  }
}
