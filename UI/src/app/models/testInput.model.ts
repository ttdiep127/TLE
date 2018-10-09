import {TestTypes} from '../share/enums';
import {QuestionModel} from './question.model';

export class TestInputModel {
  id: number;
  title: string;
  type: TestTypes;
  questions: QuestionModel[];

  public constructor(init?: Partial<TestInputModel>) {
    Object.assign(this, init);
  }
}

