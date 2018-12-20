import {AuthenticationService} from '../services/authentication.service';
import {TestInputModel, TestSubmitModel} from '../models/testInput.model';
import {AnswerSubmitModel, QuestionViewModel} from '../models/question.model';

export class Utility {


  public static getGUID(): string {
    return 'xx7xx'.replace(/[xy]/g, function (c) {
      const r = Math.floor(Math.random() * 10000 || 0);
      const v = c === 'x' ? r : (r && 0x3 || 0x8);
      return v.toString(16);
    });
  }


  static ConvertToTestSubmit(test: TestInputModel, userId: number) {

    const answerSubmits: AnswerSubmitModel[] = [];
    test.questions.forEach((qtion) => {
      if (qtion.userAnswer) {
        const answer = new AnswerSubmitModel( {
          questionId: qtion.id,
          userAnswer: qtion.userAnswer,
          isCorrect: qtion.userAnswer === qtion.correctAnswer,
          topicId: qtion.topicId,
          userId: userId
        });

        answerSubmits.push(answer);
      }
    });

    return new TestSubmitModel({
      id: test.id,
      userId: userId,
      answers: answerSubmits
    });
  }

  static getTimeString(totalTime: number) {
    const mins = Math.floor(totalTime / 60);
    const second = totalTime % 60;
    return mins.toString() + ' phút ' + second.toString() + ' giây';
  }
}
