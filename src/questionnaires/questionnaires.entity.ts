import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { QuestionEntity } from '../questions/questions.entity';
import { QuestionItemEntity } from '../question-items/question-items.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { AnswerHistoryEntity } from '../answer-histories/answer-histories.entity';

@Entity({
  name: 'QUESTIONNAIRE',
})
export class QuestionnaireEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty({ message: '설문지 제목을 입력해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '설문지 내용을 입력해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @OneToMany(
    () => QuestionEntity,
    (question: QuestionEntity) => question.questionnaire,
  )
  questions: QuestionEntity[];

  @OneToMany(
    () => QuestionItemEntity,
    (questionItem: QuestionItemEntity) => questionItem.questionnaire,
  )
  questionItems: QuestionItemEntity[];

  @OneToMany(() => AnswerEntity, (answer: AnswerEntity) => answer.questionnaire)
  answers: AnswerEntity[];

  @OneToMany(
    () => AnswerHistoryEntity,
    (answerHistory: AnswerHistoryEntity) => answerHistory.questionnaire,
  )
  answerHistories: AnswerHistoryEntity[];
}
