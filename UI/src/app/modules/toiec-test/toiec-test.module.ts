import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DevExtremeModule} from 'devextreme-angular';
import {ToiecTestComponent} from './toiec-test.component';
import {PracticeComponent } from './practice/practice.component';
import {SharedModule} from '../../share/share.module';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'general'},
      {
        path: 'general',
        component: ToiecTestComponent,
      },
      {path: 'practice', component: PracticeComponent
      }
    ])
  ],
  declarations: [
  PracticeComponent,
  QuestionComponent,
  TestComponent]
})
export class ToiecTestModule {
}
