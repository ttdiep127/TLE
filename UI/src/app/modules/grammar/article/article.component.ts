import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleModel} from '../../../models/article.model';
import {GrammarService} from '../../../services/grammar.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: ArticleModel;
  constructor(private route: ActivatedRoute, private grammarService: GrammarService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.grammarService.getArticle(id).subscribe( (arl) => {
        this.article = arl;
      });
    });
    }
  }
