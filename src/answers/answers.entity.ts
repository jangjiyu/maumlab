import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { QuestionItemEntity } from '../question-items/question-items.entity';
import { AnswerHistoryEntity } from '../answer-histories/answer-histories.entity';
import { IsNumber } from 'class-validator';

@Entity({
  name: 'ANSWER',
})
export class AnswerEntity extends CommonEntity {
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  orderIndex: number;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.answers,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn([
    {
      name: 'questionnaireId',
      referencedColumnName: 'id',
    },
  ])
  questionnaire: QuestionnaireEntity;

  @ManyToOne(
    () => QuestionEntity,
    (question: QuestionEntity) => question.answers,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn([
    {
      name: 'questionId',
      referencedColumnName: 'id',
    },
  ])
  question: QuestionEntity;

  @ManyToOne(
    () => QuestionItemEntity,
    (questionItem: QuestionItemEntity) => questionItem.answers,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn([
    {
      name: 'questionItemId',
      referencedColumnName: 'id',
    },
  ])
  questionItem: QuestionItemEntity;

  @ManyToOne(
    () => AnswerHistoryEntity,
    (answerHistory: AnswerHistoryEntity) => answerHistory.answers,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn([
    {
      name: 'answerHistoryId',
      referencedColumnName: 'id',
    },
  ])
  answerHistory: AnswerHistoryEntity;
}
