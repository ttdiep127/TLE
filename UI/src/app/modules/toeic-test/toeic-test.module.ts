import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToeicTestComponent} from './toeic-test.component';
import {SharedModule} from '../../share/share.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ToeicTestComponent,
      }
    ])
  ],
  declarations: [
    ToeicTestComponent]
})
export class ToeicTestModule {
}
