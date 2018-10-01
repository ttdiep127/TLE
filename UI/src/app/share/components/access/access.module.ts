import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AccessComponent} from './access.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GetPasswordComponent} from './get-password/get-password.component';
import {ActivationComponent} from './activation/activation.component';
import {DevExtremeModule} from 'devextreme-angular';

@NgModule({
  imports: [
    DevExtremeModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AccessComponent,
      }
    ])
  ],
  declarations: [
    AccessComponent, RegisterComponent, LoginComponent,
    GetPasswordComponent, ActivationComponent
  ]
})
export class AccessModule {
}
