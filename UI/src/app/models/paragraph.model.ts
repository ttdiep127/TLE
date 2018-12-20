import {QuestionViewModel} from './question.model';

export class ParagraphModel {
  id: number;
  contentP1?: string;
  contentP2?: string;
  part?: number;
  questions?: QuestionViewModel[];

  public constructor(init?: Partial<ParagraphModel>) {
    Object.assign(this, init);
  }
}
