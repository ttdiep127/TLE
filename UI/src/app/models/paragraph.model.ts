import {QuestionModel} from './question.model';

export class ParagraphModel {
  id: number;
  contentP1?: string;
  contentP2?: string;
  part?: number;
  questions?: QuestionModel[];

  public constructor(init?: Partial<ParagraphModel>) {
    Object.assign(this, init);
  }
}
