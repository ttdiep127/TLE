import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToiecTestComponent} from './toiec-test.component';
import {PracticeComponent} from './practice/practice.component';
import {SharedModule} from '../../share/share.module';
import {QuestionComponent} from './question/question.component';
import {TestComponent} from './test/test.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ToiecTestComponent,
      },
      {
        path: 'practice/:id', component: PracticeComponent
      }, {
        path: ':id', component: TestComponent
      }
    ])
  ],
  declarations: [
    ToiecTestComponent,
    PracticeComponent,
    QuestionComponent,
    TestComponent]
})
export class ToiecTestModule {
}
