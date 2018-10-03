import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DevExtremeModule} from 'devextreme-angular';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [
    DevExtremeModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      }
    ])
  ],
  declarations: [
  ]
})
export class HomeModule {
}
