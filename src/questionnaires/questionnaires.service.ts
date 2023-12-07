import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionnairesRepository } from './questionnaires.repository';

@Injectable()
export class QuestionnairesService {
  constructor(
    private readonly questionnairesRepository: QuestionnairesRepository,
  ) {}

  async getAll() {
    const questionNaires = await this.questionnairesRepository.findAll();
    return questionNaires;
  }

  async getOne(id) {
    console.log(id);

    const questionNaire = await this.questionnairesRepository.findById(id);

    if (!questionNaire)
      throw new BadRequestException('설문지가 존재하지 않습니다.');

    return questionNaire;
  }

  async create(body) {
    await this.questionnairesRepository.create(body);
  }

  async update(id, body) {
    const questionNaire = await this.questionnairesRepository.findById(id);

    if (!questionNaire)
      throw new BadRequestException('설문지가 존재하지 않습니다.');

    // 설문자가 있으면 수정 불가
    const answerhistory =
      await this.questionnairesRepository.findByIdWithAnswerHistory(id);

    if (answerhistory.answerHistories.length > 0)
      throw new BadRequestException('이미 설문이 진행중입니다.');

    await this.questionnairesRepository.update(id, body);
  }

  async delete(id) {
    // 설문자가 있으면 삭제 불가
    const answerhistory =
      await this.questionnairesRepository.findByIdWithAnswerHistory(id);

    if (answerhistory.answerHistories.length > 0)
      throw new BadRequestException('이미 설문이 진행중입니다.');

    await this.questionnairesRepository.delete(id);
  }
}
