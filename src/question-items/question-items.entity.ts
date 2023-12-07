import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionEntity } from '../questions/questions.entity';
import { AnswerEntity } from '../answers/answers.entity';

@Entity({
  name: 'QUESTION_ITEM',
})
export class QuestionItemEntity extends CommonEntity {
  @IsNumber()
  @IsNotEmpty({ message: '보기 항목의 번호를 입력해주세요.' })
  @Column({ type: 'integer', nullable: false })
  orderIndex: number;

  @IsString()
  @IsNotEmpty({ message: '보기 항목을 입력해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  itemName: string;

  @IsNumber()
  @IsNotEmpty({ message: '항목의 점수를 입력해주세요.' })
  @Column({ type: 'integer', nullable: false })
  score: number;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: true, default: false })
  isSkipLogicItem: boolean;

  @IsNumber()
  @Column({ type: 'integer', nullable: true })
  orderIndexToSkip: number;

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.questionItem)
  answers: AnswerEntity[];

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.questionItems,
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
    (question: QuestionEntity) => question.questionItems,
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
}
