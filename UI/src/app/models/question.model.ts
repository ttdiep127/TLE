export class QuestionViewModel {
  id: number;
  contentQ: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  correctAnswer?: number;
  partNumber?: number;
  topicId?: number;
  userAnswer: number;
  answeredByUserId: number;
  isCorrect: boolean;
  index: number;

  public constructor(init?: Partial<QuestionViewModel>) {
    Object.assign(this, init);
  }
}

export class AnswerSubmitModel {
  userId: number;
  questionId: number;
  userAnswer: number;
  isCorrect: boolean;
  topicId: number;

  public constructor(init?: Partial<AnswerSubmitModel>) {
    Object.assign(this, init);
  }
}

