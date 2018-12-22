import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AdministrationComponent} from './modules/administration/administration.component';
import {ArchivementComponent} from './modules/archivement/archivement.component';
import {ResultComponent} from './modules/result/result.component';
import {TestComponent} from './modules/test/test.component';
import {PracticeComponent} from './modules/practice/practice.component';
import {HomeComponent} from './modules/home/home.component';

const modulesPaths = {
  home: './modules/home/home.module#HomeModule',
  toiecTest: './modules/toeic-test/toeic-test.module#ToeicTestModule'
};

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'test', loadChildren: './modules/toeic-test/toeic-test.module#ToeicTestModule'},
  {path: 'test/:id', component: TestComponent},
  {path: 'practice/:topicId', component: PracticeComponent},
  {path: 'result/:id', component: ResultComponent},
  {path: 'admin', component: AdministrationComponent},
  {path: 'grammar', loadChildren: './modules/grammar/grammar.module#GrammarModule'},
  {path: 'achievement', component: ArchivementComponent}
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
