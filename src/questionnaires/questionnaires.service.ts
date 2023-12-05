import { Injectable } from '@nestjs/common';
import { QuestionnairesRepository } from './questionnaires.repository';

@Injectable()
export class QuestionNairesService {
  constructor(
    private readonly questionnairesRepository: QuestionnairesRepository,
  ) {}

  async getAll() {
    const questionNaires = await this.questionnairesRepository.findAll();
    return questionNaires;
  }

  async getOne(id) {
    const questionNaire = await this.questionnairesRepository.findById(id);
    return questionNaire;
  }

  async create(createQuestionNaireDto) {
    await this.questionnairesRepository.create(createQuestionNaireDto);
  }

  async update(id, updateQuestionNaireDto) {
    await this.questionnairesRepository.update(id, updateQuestionNaireDto);
  }

  async delete(id) {
    await this.questionnairesRepository.delete(id);
  }
}
