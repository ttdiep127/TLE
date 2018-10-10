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
import {ToiecTestComponent} from './modules/toiec-test/toiec-test.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './modules/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PracticeComponent} from './modules/toiec-test/practice/practice.component';
import {QuestionComponent} from './modules/toiec-test/question/question.component';
import {AdministrationComponent} from './modules/administration/administration.component';
import {AddTestComponent} from './modules/administration/add-test/add-test.component';
import {AddQuestionComponent} from './modules/administration/add-question/add-question.component';
import {TestService} from './services/test.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToiecTestComponent,
    PracticeComponent,
    QuestionComponent,
    AdministrationComponent,
    AddTestComponent,
    AddQuestionComponent
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
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
