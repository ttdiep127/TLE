import {NgModule} from '@angular/core';
import {SharedModule} from '../../share/share.module';
import {RouterModule} from '@angular/router';
import {GrammarComponent} from './grammar.component';
import {ArticleComponent} from './article/article.component';
import {OwlModule} from 'ngx-owl-carousel';

@NgModule({
  imports: [
    SharedModule,
    OwlModule,
    RouterModule.forChild([
      {
        path: '',
        component: GrammarComponent,
      }, {
        path: ':id', component: ArticleComponent

      }
    ])
  ],
  declarations: [
    GrammarComponent,
    ArticleComponent]
})
export class GrammarModule {
}
