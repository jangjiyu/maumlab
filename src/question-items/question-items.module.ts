import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionItemEntity } from './question-items.entity';
import { QuestionItemsController } from './question-items.controller';
import { QuestionItemsService } from './question-items.service';
import { QuestionItemsRepository } from './question-items.repository';
import { QuestionEntity } from '../questions/questions.entity';
import { QuestionnaireEntity } from '../questionnaires/questionnaires.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionItemEntity]),
    TypeOrmModule.forFeature([QuestionEntity]),
    TypeOrmModule.forFeature([QuestionnaireEntity]),
  ],
  controllers: [QuestionItemsController],
  providers: [QuestionItemsService, QuestionItemsRepository],
  exports: [],
})
export class QuestionItemsModule {}
