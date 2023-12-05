import { PickType } from '@nestjs/swagger';
import { QuestionnaireEntity } from '../questionnaires.entity';

export class CreateQuestionNaireDto extends PickType(QuestionnaireEntity, [
  'title',
  'description',
  'isMultipleChoiceQuestion',
] as const) {}
