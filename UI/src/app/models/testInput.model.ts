import {AnswerSubmitModel, QuestionViewModel} from './question.model';
import {TestTypes} from '../share/enums';

export class TestInputModel {
  id: number;
  title: string;
  topicId: number;
  partNumber: number;
  createdAt: Date;
  createByName: string;
  createdByUserId: number;
  questions: QuestionViewModel[];

  public constructor(init?: Partial<TestInputModel>) {
    Object.assign(this, init);
  }
}

export class TestSubmitModel {
  id: number;
  userId: number;
  answers: AnswerSubmitModel[];
  totalTime: number;

  public constructor(init?: Partial<TestSubmitModel>) {
    Object.assign(this, init);
  }
}

export class TestTypeModel {
  typeId: TestTypes;
  part: number;
  topicId: number;
  text: string;
  examTime: number;

  public constructor(init?: Partial<TestTypeModel>) {
    Object.assign(this, init);
  }
}

export class TestResultView {
  id: number;
  userId: number;
  testId: number;
  correctAnswer: number;
  guidId: string;
  totalTime: number;
  examedAt: Date;
  testName: string;
  typeTestId: TestTypes;
  totalQuestion: number;

  public constructor(init?: Partial<TestResultView>) {
    Object.assign(this, init);
  }
}
