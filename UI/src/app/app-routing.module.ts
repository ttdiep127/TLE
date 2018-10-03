import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {ToiecTestComponent} from './modules/toiec-test/toiec-test.component';
const modulesPaths = {
  home: './modules/home/home.module#HomeModule',
  toiecTest: './modules/toiec-test/toiec-test.module#ToiecTestModule'
};

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'test', loadChildren: modulesPaths.toiecTest}
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
