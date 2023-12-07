import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async getAll(questionnaireId) {
    const questions =
      await this.questionsRepository.findAllByQuestionnaireId(questionnaireId);
    return questions;
  }

  async create(questionnaireId, body) {
    const questionnaire =
      await this.questionsRepository.findQuestionnaire(questionnaireId);

    if (!questionnaire)
      throw new BadRequestException('설문지가 존재하지 않습니다.');

    // TODO: 해당 설문지 orderIndex 중복 체크

    await this.questionsRepository.create(questionnaireId, body);
  }

  async update(id, body) {
    // 설문자가 있으면 수정 불가
    // TODO: param id -> questionId임 questionnaireId 찾아야함
    // const answerhistory =
    //   await this.questionsRepository.findWithAnswerHistory(id);

    // if (answerhistory.answerHistories.length > 0)
    //   throw new BadRequestException('이미 설문이 진행중입니다.');

    await this.questionsRepository.update(id, body);
  }

  async delete(id) {
    // 설문자가 있으면 삭제 불가
    // TODO: param id -> questionId임 questionnaireId 찾아야함
    // const answerhistory =
    //   await this.questionsRepository.findWithAnswerHistory(id);

    // if (answerhistory.answerHistories.length > 0)
    //   throw new BadRequestException('이미 설문이 진행중입니다.');

    await this.questionsRepository.delete(id);
  }
}
