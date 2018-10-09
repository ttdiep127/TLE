export class QuestionModel {
  id: number;
  contentQ: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  correctAnswer?: number;
  part?: number;
  position?: number;

  public constructor(init?: Partial<QuestionModel>) {
    Object.assign(this, init);
  }
}


export class QuestionAnswerModel {
  id: number;
  question: QuestionModel;
  userAnswer: number;
  isCorrect: boolean;

  public constructor(init?: Partial<QuestionAnswerModel>) {
    Object.assign(this, init);
  }
}

export class QuestionAnswerOutput {
  userId: number;
  qtionId: number;
  answer: number;
  isCorrect: boolean;

  public constructor(init?: Partial<QuestionAnswerOutput>) {
    Object.assign(this, init);
  }

}
