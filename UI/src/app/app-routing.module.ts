import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {AdministrationComponent} from './modules/administration/administration.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
const modulesPaths = {
  home: './modules/home/home.module#HomeModule',
  toiecTest: './modules/toeic-test/toeic-test.module#ToeicTestModule'
};

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'test', loadChildren:  './modules/toeic-test/toeic-test.module#ToeicTestModule'},
  {path: 'admin', component: AdministrationComponent},
  {path: 'grammar', loadChildren: './modules/grammar/grammar.module#GrammarModule'}
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
