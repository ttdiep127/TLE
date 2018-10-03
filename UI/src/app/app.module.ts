import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './share/share.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {CookieService} from 'angular2-cookie/core';
import {BaseService} from './services/base.service';
import {Utility} from './share/Utility';
import {NgxPermissionsModule} from 'ngx-permissions';
import { ToiecTestComponent } from './modules/toiec-test/toiec-test.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToiecTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    CookieService,
    Utility,
    BaseService,
    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}