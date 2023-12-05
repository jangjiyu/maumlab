import { Test, TestingModule } from '@nestjs/testing';
import { QuestionItemsController } from './question-items.controller';

describe('QuestionItemsController', () => {
  let controller: QuestionItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionItemsController],
    }).compile();

    controller = module.get<QuestionItemsController>(QuestionItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
