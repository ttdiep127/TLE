import {TestTypes} from '../share/enums';
import {QuestionModel} from './question.model';
import {ParagraphModel} from './paragraph.model';

export class TestInputModel {
  id: number;
  title: string;
  type: TestTypes;
  questions: QuestionModel[];
  paragraphs: ParagraphModel[]

  public constructor(init?: Partial<TestInputModel>) {
    Object.assign(this, init);
  }
}

