import {Component, OnInit} from '@angular/core';
import {GrammarService} from '../../services/grammar.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ArchivementComponent} from '../archivement/archivement.component';
import {AchievementService} from '../../services/achievement.service';
import {ArticleModel} from '../../models/article.model';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {

  topicIds: number[] = [1, 6, 5, 2, 7];

  userId: number;
  allArticles:  ArticleModel[] = [];
  articlesRecommend: ArticleModel[] = [];
  constructor(private grammarService: GrammarService,
              private authService: AuthenticationService,
              private archService: AchievementService) {
  }

  ngOnInit() {
    this.userId = this.authService.currentUserId;

    this.grammarService.getAllArticles().subscribe((rr) => {
      this.allArticles = rr;
    });

    if (this.userId) {
      this.archService.getRecommend(this.userId).subscribe((ars) => {
        console.log(ars);
        this.articlesRecommend = ars;
      });
    }

  }

}
