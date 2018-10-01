import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DevExtremeModule, DxTemplateModule} from 'devextreme-angular';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {MemberbarComponent} from './components/header/memberbar/memberbar.component';
import {MenubarComponent} from './components/header/menubar/menubar.component';
import {LoginComponent} from './components/access/login/login.component';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  DevExtremeModule,
  DxTemplateModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  HeaderComponent,
  CarouselComponent,
  MemberbarComponent,
  MenubarComponent,
  LoginComponent
]

const NB_THEME_PROVIDERS = [];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers:  [...NB_THEME_PROVIDERS],
    };
  }
}
