import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswersRepository } from './answers.repository';

@Injectable()
export class AnswersService {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async getOne(answerHistoryId) {
    const answer = await this.answersRepository.findAnswerById(answerHistoryId);

    if (!answer)
      throw new BadRequestException('설문 정보가 존재하지 않습니다.');

    const questionnaireInfo =
      await this.answersRepository.findQuestionnaireInfo(
        answer.questionnaire.id,
      );

    return { questionnaireInfo, answer };
  }

  async create(questionnaireId, body) {
    const questionnaireInfo =
      await this.answersRepository.findQuestionnaireInfo(questionnaireId);

    if (!questionnaireInfo)
      throw new BadRequestException('설문지가 존재하지 않습니다.');

    // 검증된 answer
    const validatedAnswer = [];

    // 총점
    let score = 0;

    // answer 정리
    const answer = {};
    body.forEach((question) => {
      answer[question.id] = question.questionItems;
    });

    // errors
    const errors = [];

    // skip 여부
    let isSkipLogic = false;
    let orderIndexToSkip;

    // multiple choice 여부
    let isMultipleChoiceQuestion;

    questionnaireInfo.questions.forEach((question) => {
      isMultipleChoiceQuestion = question.isMultipleChoiceQuestion;

      // multiple choice가 아닌데 중복 선택한 경우 error 추가
      if (!isMultipleChoiceQuestion && answer[question.id].length > 1)
        errors.push({
          questionId: question.id,
          message: 'multiple choice is not allowed',
        });
      if (isSkipLogic && question.orderIndex === orderIndexToSkip)
        isSkipLogic = false;
      if (isSkipLogic && question.orderIndex !== orderIndexToSkip) return;

      // skip 여부 확인 및 score 계산
      question.questionItems.forEach((questionItem) => {
        if (
          questionItem.isSkipLogicItem &&
          answer[question.id].includes(questionItem.id)
        ) {
          isSkipLogic = true;
          orderIndexToSkip = questionItem.orderIndexToSkip;
        }

        if (answer[question.id].includes(questionItem.id))
          score += questionItem.score;
      });

      answer[question.id].forEach((questionItemId) => {
        validatedAnswer.push({
          questionnaireId,
          questionId: question.id,
          questionItemId,
          orderIndex: question.orderIndex,
        });
      });
    });

    if (errors.length > 0) throw new BadRequestException(errors);

    // answerHistory.answer 저장
    await this.answersRepository.create(
      questionnaireId,
      score,
      validatedAnswer,
    );
  }

  async update(answerHistoryId, body) {
    const answerInfo =
      await this.answersRepository.findAnswerById(answerHistoryId);

    if (!answerInfo)
      throw new BadRequestException('설문 정보가 존재하지 않습니다.');

    const questionnaireId = answerInfo.questionnaire.id;

    const questionnaireInfo =
      await this.answersRepository.findQuestionnaireInfo(questionnaireId);

    // 검증된 answer
    const validatedAnswer = [];

    // 총점
    let score = 0;

    // answer 정리
    const answer = {};
    body.forEach((question) => {
      answer[question.id] = question.questionItems;
    });

    // errors
    const errors = [];

    // skip 여부
    let isSkipLogic;
    let orderIndexToSkip;

    // multiple choice 여부
    let isMultipleChoiceQuestion;

    questionnaireInfo.questions.forEach((question) => {
      isMultipleChoiceQuestion = question.isMultipleChoiceQuestion;

      // multiple choice가 아닌데 중복 선택한 경우 error 추가
      if (!isMultipleChoiceQuestion && answer[question.id].length > 1)
        errors.push({
          questionId: question.id,
          message: 'multiple choice is not allowed',
        });
      if (isSkipLogic && question.orderIndex === orderIndexToSkip)
        isSkipLogic = false;
      if (isSkipLogic && question.orderIndex !== orderIndexToSkip) return;

      // skip 여부 확인 및 score 계산
      question.questionItems.forEach((questionItem) => {
        if (
          questionItem.isSkipLogicItem &&
          answer[question.id].includes(questionItem.id)
        ) {
          isSkipLogic = true;
          orderIndexToSkip = questionItem.orderIndexToSkip;
        }

        if (answer[question.id].includes(questionItem.id))
          score += questionItem.score;
      });

      answer[question.id].forEach((questionItemId) => {
        validatedAnswer.push({
          questionnaireId,
          questionId: question.id,
          questionItemId,
          orderIndex: question.orderIndex,
        });
      });
    });

    if (errors.length > 0) throw new BadRequestException(errors);

    // answerHistory.answer 저장
    await this.answersRepository.update(
      answerHistoryId,
      score,
      validatedAnswer,
    );
  }

  async delete(answerHistoryId) {
    const answer = await this.answersRepository.findAnswerById(answerHistoryId);

    if (!answer)
      throw new BadRequestException('설문 정보가 존재하지 않습니다.');

    await this.answersRepository.delete(answerHistoryId);
  }
}
