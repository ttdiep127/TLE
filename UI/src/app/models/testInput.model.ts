import {TestTypes} from '../share/enums';
import {ParagraphModel} from './paragraph.model';
import {QuestionAnswerOutput, QuestionModel} from './question.model';

export class TestInputModel {
  id: number;
  title: string;
  typeId: TestTypes;
  questions: QuestionModel[];
  paragraphs: ParagraphModel[];

  public constructor(init?: Partial<TestInputModel>) {
    Object.assign(this, init);
  }
}

export class TestOutputModel {
  id: number;
  typeId: TestTypes;
  answers: QuestionAnswerOutput[];

  public constructor(init?: Partial<TestOutputModel>) {
    Object.assign(this, init);
  }
}

