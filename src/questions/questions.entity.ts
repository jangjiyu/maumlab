import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';
import { QuestionItemEntity } from '../question-items/question-items.entity';
import { AnswerEntity } from '../answers/answers.entity';

@Entity({
  name: 'QUESTION',
})
export class QuestionEntity extends CommonEntity {
  @IsNumber()
  @IsNotEmpty({ message: '설문 문항의 번호를 입력해주세요.' })
  @Column({ type: 'integer', nullable: false })
  orderIndex: number;

  @IsString()
  @IsNotEmpty({ message: '설문 문항을 입력해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  questionName: string;

  @IsBoolean()
  @IsNotEmpty({ message: '복수 선택 가능 여부를 입력해주세요.' })
  @Column({ type: 'boolean', nullable: false })
  isMultipleChoiceQuestion: boolean;

  @OneToMany(
    () => QuestionItemEntity,
    (questionItem: QuestionItemEntity) => questionItem.question,
  )
  questionItems: QuestionItemEntity[];

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.question)
  answers: AnswerEntity[];

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire: QuestionnaireEntity) => questionnaire.questions,
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
