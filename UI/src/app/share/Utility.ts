import {QuestionAnswerModel, QuestionAnswerOutput} from '../models/question.model';
import {AuthenticationService} from '../services/authentication.service';

export class Utility {


  public static getGUID(): string {
    return 'xx7xx'.replace(/[xy]/g, function (c) {
      const r = Math.floor(Math.random() * 10000 || 0);
      const v = c === 'x' ? r : (r && 0x3 || 0x8);
      return v.toString(16);
    });
  }

  public static toQuestionAnswerOutput(qa: QuestionAnswerModel[], userId: number): QuestionAnswerOutput[] {
    const output = [];
    qa.forEach(aq => {
      if (aq.userAnswer !== null) {
        const input = new QuestionAnswerOutput({
          userId: userId,
          answer: aq.userAnswer,
          qtionId: aq.question.id,
          isCorrect: aq.isCorrect,
          topicId: aq.question.topicId
        });
        output.push(input);
      }
    });
    return output;
  }

}
