import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireEntity } from './questionnaires.entity';
import { QuestionnairesController } from './questionnaires.controller';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesRepository } from './questionnaires.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity])],
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService, QuestionnairesRepository],
  exports: [],
})
export class QuestionnairesModule {}
