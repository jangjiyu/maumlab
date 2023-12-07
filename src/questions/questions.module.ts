import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsRepository } from './questions.repository';
import { QuestionnaireEntity } from 'src/questionnaires/questionnaires.entity';
import { QuestionnairesRepository } from 'src/questionnaires/questionnaires.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, QuestionsRepository]),
    TypeOrmModule.forFeature([QuestionnaireEntity, QuestionnairesRepository]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository, QuestionnairesRepository],
  exports: [],
})
export class QuestionsModule {}
