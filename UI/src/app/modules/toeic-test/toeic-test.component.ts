import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-toeic-test',
  templateUrl: './toeic-test.component.html',
  styleUrls: ['./toeic-test.component.scss']
})
export class ToeicTestComponent implements OnInit {

  paramsSub: any;
  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService,
              private userService: UserService) {
    this.paramsSub = this.route.params.subscribe(params => {
        const id = params['id'];
  }
    );
  }

  ngOnInit() {
  }


}
