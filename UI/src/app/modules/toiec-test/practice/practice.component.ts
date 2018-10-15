import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionAnswerModel, QuestionAnswerOutput, QuestionModel} from '../../../models/question.model';
import {UserService} from '../../../services/user.service';
import {cloneDeep} from 'lodash';
import {ParagraphModel} from '../../../models/paragraph.model';
import notify from 'devextreme/ui/notify';
import {GuideToiecPartV} from '../../../data/guideToiecPart';
import {QuestionService} from '../../../services/question.service';
import {Answers} from '../../../share/enums';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  partNumber: number;
  count: number;
  paramsSub: any;
  currentQuestion: QuestionAnswerModel;
  isSelected: boolean;
  questionsStorage: QuestionAnswerModel[];
  isLoading: boolean;
  isEnd: boolean;
  userId: number;
  paragraphsStorage: ParagraphModel[];
  currentPara: ParagraphModel;
  isFirstQuestion: boolean;
  guideToiecPart = GuideToiecPartV;
  inIntroduce: boolean;
  correctAnswer: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService,
              private userService: UserService) {
    this.userId = 2;
    this.paramsSub = this.route.params.subscribe(params => {
        const id = params['id'];
        if (!isNaN(id)) {
          this.partNumber = parseInt(id, 10);
        }
        if (!this.partNumber) {
          this.router.navigate(['/test']);
        }
      }
    );
    this.inIntroduce = true;
    this.questionsStorage = [];
    this.paragraphsStorage = [];
    this.isLoading = false;
    this.isEnd = false;
    this.isFirstQuestion = false;
  }

  ngOnInit() {
    this.count = 1;
    switch (this.partNumber) {
      case 5: {
        this.getQuestions();
        break;
      }
      case 6: {
        this.getParagraph();
        break;
      }
      case 7: {
        this.getParagraph();
        break;
      }
      default: {
        this.router.navigate(['/test']);
      }

    }
    this.isSelected = false;
  }

  setCurrentQuestion(questionAnswer: QuestionAnswerModel) {
    if (questionAnswer) {
      this.currentQuestion = questionAnswer;
      if (this.currentQuestion.userAnswer) {
        this.correctAnswer = this.displayAnswer(this.currentQuestion);
      }

      if (this.currentQuestion === this.questionsStorage[0]) {
        this.isFirstQuestion = true;
      } else {
        this.isFirstQuestion = false;
      }
    }
  }

  setCurrentParagraph(para: ParagraphModel) {
    if (para) {
      this.currentPara = para;
      this.questionsStorage = this.resetQuestionStorage(para.questions);
      if (this.currentPara === this.paragraphsStorage[0]) {
        this.isFirstQuestion = true;
      } else {
        this.isFirstQuestion = false;
      }
    }
  }

  getParagraph() {
    this.questionService.getParagraph(this.partNumber).subscribe((para) => {
      if (para) {
        para.id = this.count;
        this.paragraphsStorage.push(para);
        this.questionsStorage = this.resetQuestionStorage(para.questions);
      }
      this.setCurrentParagraph(this.paragraphsStorage[this.count - 1]);
      this.count += 1;
    }, e => notify(e), () => this.isLoading = false);
  }

  resetQuestionStorage(questions: QuestionModel[]): QuestionAnswerModel[] {
    const storage: QuestionAnswerModel[] = [];
    questions.forEach(qtion => {
      const questionAnswer = new QuestionAnswerModel({
        id: qtion.position,
        question: qtion
      });
      storage.push(questionAnswer);
    });

    return storage;
  }

  getQuestions() {
    this.isLoading = true;
    this.questionService.getQuestions(this.partNumber).subscribe(qtions => {
        if (qtions) {
          qtions.forEach(qtion => {
            const questionAnswer = new QuestionAnswerModel();
            questionAnswer.question = qtion;
            questionAnswer.id = this.count;
            this.questionsStorage.push(questionAnswer);
            this.count += 1;
          });
          if (!this.currentQuestion) {
            this.setCurrentQuestion(this.questionsStorage[0]);
          }
        } else {
          notify('Error loading data!', 'error');
          this.isEnd = true;
        }
      }, (e) => {
        notify(e);
      }, () => this.isLoading = false
    );
  }

  updateAnswer(qa: QuestionAnswerModel) {
    if (this.partNumber === 6) {
      this.currentQuestion = this.questionsStorage[qa.id - 1];
    }
    this.currentQuestion.isCorrect = qa.isCorrect;
    this.currentQuestion.userAnswer = qa.userAnswer;
    if (this.currentQuestion.userAnswer) {
      this.correctAnswer = this.displayAnswer(this.currentQuestion);
      const input = new QuestionAnswerOutput({
        userId: this.userId,
        answer: qa.userAnswer,
        qtionId: qa.question.id,
        isCorrect: qa.isCorrect
      });
      this.userService.answerQuestion(input).subscribe((rr) => {
          if (!rr.success) {
            notify(rr.message, 'warning');
            this.clickNext();
          }
        }, () => notify('Error Server', 'error')
      );
    }
  }

  displayAnswer(qa: QuestionAnswerModel): string {
    let answer = '';
    if (qa.userAnswer) {
      switch (qa.question.correctAnswer) {
        case Answers.A: {
          answer = 'A. ' + qa.question.answer1;
          break;
        }
        case Answers.B: {
          answer = 'B. ' + qa.question.answer2;
          break;
        }
        case Answers.C: {
          answer = 'C. ' + qa.question.answer3;
          break;
        }
        case Answers.D: {
          answer = 'D. ' + qa.question.answer4;
          break;
        }
        default:
          answer = 'No answer';
      }

      debugger;
      const notification = document.getElementsByClassName('notification');
      if (notification) {
        const position = notification.length === 1 ? 0 : qa.id - 1;
        notification.item(position).classList.remove('correct-answer');
        notification.item(position).classList.remove('incorrect-answer');
        if (qa.isCorrect) {
          document.getElementsByClassName('notification').item(position).classList.add('correct-answer');
        } else {
          document.getElementsByClassName('notification').item(position).classList.add('incorrect-answer');
        }
      }
    }
    return answer;
  }

  clickPrevious() {
    this.isEnd = false;

    if (this.partNumber === 5) {
      this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id - 2]);
    }

    if (this.partNumber === 6 || this.partNumber === 7) {
      this.setCurrentParagraph(this.paragraphsStorage[this.currentPara.id - 2]);
    }
  }

  clickNext() {
    if (this.partNumber === 5) {
      if (this.questionsStorage[this.currentQuestion.id]) {
        this.setCurrentQuestion(this.questionsStorage[this.currentQuestion.id]);
      }
      if (!this.questionsStorage[this.currentQuestion.id + 1]) {
        this.getQuestions();
      }
    }

    if (this.partNumber === 6 || this.partNumber === 7) {
      this.getParagraph();
    }
  }

  clickEnd() {
    this.router.navigate(['/test']);
  }
}
