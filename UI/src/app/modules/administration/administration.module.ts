import { NgModule } from '@angular/core';
import { AddTestComponent } from './add-test/add-test.component';
import {SharedModule} from '../../share/share.module';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [AddTestComponent, AddQuestionComponent]
})
export class AdministrationModule { }
