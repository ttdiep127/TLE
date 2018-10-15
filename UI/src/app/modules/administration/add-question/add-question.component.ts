import {Component, OnInit} from '@angular/core';
import {TOIECPARTS} from '../../../share/constant.data';
import {QuestionModel} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  answers: string[];
  toiecParts = TOIECPARTS;
  correctAnswer: string;
  questionStorage: QuestionModel[];
  isLoading: boolean;

  constructor(private qtionService: QuestionService) {
  }

  ngOnInit() {
    this.answers = [];
    this.questionStorage = [];
    this.isLoading = false;
  }

  onFormSubmit(e) {
    this.isLoading = true;
    const qtionTemple = [];
    this.questionStorage.forEach((qtion) => {
      const question = new QuestionModel({
        id: 0,
        contentQ: qtion.contentQ,
        correctAnswer: qtion.correctAnswer,
        answer1: qtion.answer1,
        answer2: qtion.answer2,
        answer3: qtion.answer3,
        answer4: qtion.answer4,
        position: qtion.position,
        part: qtion.part,
        topicId: qtion.topicId
      });
      qtionTemple.push(question);
    });
    this.qtionService.addQuestions(qtionTemple).subscribe(
      rr => {
        debugger;
        if (rr.success) {
          this.questionStorage = [];
          notify('Add Success', 'success');
        } else {
          notify('Unsuccessfully', 'warning');
        }
      }, er => {
        debugger;
        notify('Error Server', 'error');
      }, () => this.isLoading = false
    );
  }

}
