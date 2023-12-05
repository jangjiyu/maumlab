import { Test, TestingModule } from '@nestjs/testing';
import { AnswerHistoriesController } from './answer-histories.controller';

describe('AnswerHistoriesController', () => {
  let controller: AnswerHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerHistoriesController],
    }).compile();

    controller = module.get<AnswerHistoriesController>(AnswerHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
