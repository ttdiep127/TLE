import {QuestionModel} from './question.model';

export class ParagraphModel {
  id: number;
  contentP1: string;
  contentP2: string;
  questions: QuestionModel[];
}
