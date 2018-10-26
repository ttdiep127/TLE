import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToeicTestComponent} from './toeic-test.component';
import {PracticeComponent} from './practice/practice.component';
import {SharedModule} from '../../share/share.module';
import {QuestionComponent} from './question/question.component';
import {TestComponent} from './test/test.component';
import { ResultComponent } from './result/result.component';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    SharedModule,
    OwlModule,
    RouterModule.forChild([
      {
        path: '',
        component: ToeicTestComponent,
      },
      {
        path: 'practice/:id', component: PracticeComponent
      }, {
        path: ':id', component: TestComponent
      }
    ])
  ],
  declarations: [
    ToeicTestComponent,
    PracticeComponent,
    QuestionComponent,
    TestComponent,
    ResultComponent]
})
export class ToeicTestModule {
}
