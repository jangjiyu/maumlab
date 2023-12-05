import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnairesController } from './questionnaires/questionnaires.controller';
import { QuestionsController } from './questions/questions.controller';
import { QuestionItemsController } from './question-items/question-items.controller';
import { AnswersController } from './answers/answers.controller';
import { AnswerHistoriesController } from './answer-histories/answer-histories.controller';
import { QuestionnaireEntity } from './questionnaires/questionnaires.entity';
import { QuestionEntity } from './questions/questions.entity';
import { QuestionItemEntity } from './question-items/question-items.entity';
import { AnswerEntity } from './answers/answers.entity';
import { AnswerHistoryEntity } from './answer-histories/answer-histories.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [
      QuestionnaireEntity,
      QuestionEntity,
      QuestionItemEntity,
      AnswerEntity,
      AnswerHistoryEntity,
    ],
    synchronize: true, // TODO: production에서는 false로 바꾸기
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(4000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ],
  controllers: [
    AppController,
    QuestionnairesController,
    QuestionsController,
    QuestionItemsController,
    AnswersController,
    AnswerHistoriesController,
  ],
  providers: [AppService],
})
export class AppModule {}
