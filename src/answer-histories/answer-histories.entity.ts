import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { IsNumber } from 'class-validator';
import { AnswerEntity } from '../answers/answers.entity';

@Entity({
  name: 'ANSWER_HISTORY',
})
export class AnswerHistoryEntity extends CommonEntity {
  @IsNumber()
  @Column({ type: 'integer', nullable: false })
  score: number;

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.answerHistory)
  answers: AnswerEntity[];

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.answerHistories,
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
}
