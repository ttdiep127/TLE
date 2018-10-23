import {Component, Input, OnInit} from '@angular/core';
import {QuestionAnswerModel} from '../../../models/question.model';
import {TestService} from '../../../services/test.service';
import {AchievementService} from '../../../services/achievement.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() test: QuestionAnswerModel[];
  correctAnswerNumber: number;

  constructor(private achivementService: AchievementService) {

  }
  ngOnInit() {
  }

}
