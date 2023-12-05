import { CommonEntity } from '../common/entities/common.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { QuestionItemEntity } from '../question-items/question-items.entity';

@Entity({
  name: 'ANSWER',
})
export class AnswerEntity extends CommonEntity {
  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.answers,
    {
      onDelete: 'CASCADE',
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
    },
  )
  @JoinColumn([
    {
      name: 'questionId',
      referencedColumnName: 'id',
    },
  ])
  questionItem: QuestionItemEntity;
}
