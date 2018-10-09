import {Component, OnInit, ViewChild} from '@angular/core';
import {TestInputModel} from '../../../models/testInput.model';
import {TESTTYPES, TOIECPARTS} from '../../../share/constant.data';
import {QuestionModel} from '../../../models/question.model';
import {ParagraphModel} from '../../../models/paragraph.model';
import {ListItem} from '../../../models/list-item.model';
import {DxDataGridComponent} from 'devextreme-angular';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  @ViewChild(validationPara)
  testInput: TestInputModel;
  typeTests = TESTTYPES;
  isLoading: boolean;
  questionStorage: QuestionModel[] = [];
  paraStorage: ParagraphModel[] = [];
  currentPara: ParagraphModel;
  addQuestionVisible: boolean;
  toiecParts = TOIECPARTS;
  paraParts: ListItem<number>[];

  constructor() {
  }

  ngOnInit() {
    this.paraParts = [this.toiecParts[5], this.toiecParts[6]];
    this.testInput = new TestInputModel();
    this.isLoading = false;
    this.addQuestionVisible = false;
    this.resetPara(this.currentPara);
  }

  onFormSubmit(e) {
  }

  addParagraph(e, validation) {
    const qtionTemple = [];
    this.currentPara.questions.forEach( (qtion) => {
      const question = new QuestionModel( {
        contentQ : qtion.contentQ,
        correctAnswer: qtion.correctAnswer,
        answer1: qtion.answer1,
        answer2: qtion.answer1,
        answer3: qtion.answer3,
        answer4: qtion.answer4,
        position: qtion.position,
        part: this.currentPara.part
      });
      qtionTemple.push(question);
    });

    const para = new ParagraphModel({
      part: this.currentPara.part,
      contentP1: this.currentPara.contentP1,
      contentP2: this.currentPara.contentP2,
      questions: qtionTemple
    });

    this.paraStorage.push(para);
    this.resetPara(this.currentPara);
    debugger;
  }

  resetPara(para: ParagraphModel) {
    this.currentPara = new ParagraphModel();
    this.currentPara.questions = [];
  }

}
