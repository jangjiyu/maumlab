import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './answers.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswersRepository } from './answers.repository';
import { AnswerHistoryEntity } from 'src/answer-histories/answer-histories.entity';
import { QuestionnaireEntity } from 'src/questionnaires/questionnaires.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity]),
    TypeOrmModule.forFeature([AnswerHistoryEntity]),
    TypeOrmModule.forFeature([QuestionnaireEntity]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository],
  exports: [],
})
export class AnswersModule {}
