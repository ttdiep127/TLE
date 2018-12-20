import {Component, OnInit, ViewChild} from '@angular/core';
import {TestInputModel} from '../../../models/testInput.model';
import {ParagraphModel} from '../../../models/paragraph.model';
import {ListItem} from '../../../models/list-item.model';
import {DxDataGridComponent} from 'devextreme-angular';
import {cloneDeep} from 'lodash';
import {DxoSummaryComponent} from 'devextreme-angular/ui/nested/summary';
import {TestService} from '../../../services/test.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  // @ViewChild('dataGirdQuestion') dataGirdPara: DxDataGridComponent;
  // @ViewChild('summary') summary = DxoSummaryComponent;
  // testInput: TestInputModel;
  // typeTests = TESTTYPES;
  // isLoading: boolean;
  // questionStorage: QuestionModel[] = [];
  // paraStorage: ParagraphModel[] = [];
  // currentPara: ParagraphModel;
  // toiecParts = TOIECPARTS;
  // paraParts: ListItem<number>[];
  // isValidDataGird: boolean;

  constructor(private testService: TestService) {
  }

  ngOnInit() {
    // this.paraParts = [this.toiecParts[5], this.toiecParts[6]];
    // this.initData();
    // this.isLoading = false;
  }

  // initData() {
  //   this.testInput = new TestInputModel();
  //   this.resetPara(this.currentPara);
  //   this.isValidDataGird = false;
  //
  // }
  //
  // onFormSubmit(e) {
  //   if (!e.validationGroup.validate().isValid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   console.log(this.testInput);
  //   this.testInput.questions = this.convertToQuestionModel(this.questionStorage);
  //   this.testInput.paragraphs = this.paraStorage;
  //   this.testService.saveTest(this.testInput).subscribe((rr) => {
  //     if (rr.success) {
  //       notify('Save successfully', 'success');
  //       this.initData();
  //     } else {
  //       notify(rr.message, 'warning');
  //     }
  //   }, (er) => {
  //     notify(er, 'error');
  //     this.isLoading = false;
  //   }, () => {
  //     this.isLoading = false;
  //   });
  // }
  //
  // addParagraph(e) {
  //   if (!e.validationGroup.validate().isValid) {
  //     return;
  //   }
  //
  //   const para = new ParagraphModel({
  //     part: this.currentPara.part,
  //     contentP1: this.currentPara.contentP1,
  //     contentP2: this.currentPara.contentP2,
  //     questions: this.convertToQuestionModel(this.currentPara.questions)
  //   });
  //
  //   this.paraStorage.push(para);
  //   this.resetPara(this.currentPara);
  // }
  //
  // convertToQuestionModel(questions) {
  //   const qtionTemple = [];
  //   questions.forEach((qtion) => {
  //     const question = new QuestionModel({
  //       contentQ: qtion.contentQ,
  //       correctAnswer: qtion.correctAnswer,
  //       answer1: qtion.answer1,
  //       answer2: qtion.answer2,
  //       answer3: qtion.answer3,
  //       answer4: qtion.answer4,
  //       position: qtion.position,
  //       part: qtion.part
  //     });
  //     qtionTemple.push(question);
  //   });
  //   return qtionTemple;
  // }
  //
  // onDataGirdChange() {
  //   console.log(this.dataGirdPara);
  //   this.isValidDataGird = this.dataGirdPara.instance.getVisibleRows().length > 2;
  // }
  //
  // resetPara(para: ParagraphModel) {
  //   this.currentPara = new ParagraphModel();
  //   this.currentPara.questions = [];
  //   this.isValidDataGird = false;
  // }

}
