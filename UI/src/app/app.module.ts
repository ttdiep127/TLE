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
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './modules/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdministrationComponent} from './modules/administration/administration.component';
import {AddTestComponent} from './modules/administration/add-test/add-test.component';
import {AddQuestionComponent} from './modules/administration/add-question/add-question.component';
import {TestService} from './services/test.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AchievementService} from './services/achievement.service';
import {GrammarService} from './services/grammar.service';
import { ArchivementComponent } from './modules/archivement/archivement.component';
import {ResultComponent} from './modules/result/result.component';
import {OwlModule} from 'ngx-owl-carousel';
import {QuestionComponent} from './modules/question/question.component';
import {TestComponent} from './modules/test/test.component';
import {PracticeComponent} from './modules/practice/practice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdministrationComponent,
    QuestionComponent,
    AddTestComponent,
    AddQuestionComponent,
    PageNotFoundComponent,
    ArchivementComponent,
    ResultComponent,
    TestComponent,
    PracticeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
    OwlModule
  ],
  providers: [
    CookieService,
    Utility,
    BaseService,
    AuthenticationService,
    UserService,
    TestService,
    AchievementService,
    GrammarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
