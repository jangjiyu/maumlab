import { CommonEntity } from '../common/entities/common.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';

@Entity({
  name: 'ANSWER_HISTORY',
})
export class AnswerHistoryEntity extends CommonEntity {
  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.answerHistories,
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
}
