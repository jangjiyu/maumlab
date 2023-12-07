import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionItemsRepository } from './question-items.repository';

@Injectable()
export class QuestionItemsService {
  constructor(
    private readonly questionItemsRepository: QuestionItemsRepository,
  ) {}

  async getAll(questionId) {
    const questionNaires =
      await this.questionItemsRepository.findAllByQuestionId(questionId);
    return questionNaires;
  }

  async create(qustionnaireId, questionId, body) {
    const questionInfo =
      await this.questionItemsRepository.findAllByQuestionId(questionId);

    if (!questionInfo)
      throw new BadRequestException('존재하지 않는 설문 문항입니다.');

    await this.questionItemsRepository.create(qustionnaireId, questionId, body);
  }

  async update(qustionnaireId, questionId, body) {
    const questionInfo =
      await this.questionItemsRepository.findAllByQuestionId(questionId);

    if (!questionInfo)
      throw new BadRequestException('존재하지 않는 설문 문항입니다.');

    // TODO: 설문자가 있으면 수정 불가

    await this.questionItemsRepository.create(qustionnaireId, questionId, body);
  }

  async delete(questionId) {
    // TODO: 설문자가 있으면 삭제 불가

    await this.questionItemsRepository.delete(questionId);
  }
}
