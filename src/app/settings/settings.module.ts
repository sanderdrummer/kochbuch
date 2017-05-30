import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SettingsComponent} from './settings.component';
import {SettingsRouting} from './settings.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRouting,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [LoginComponent, SettingsComponent]
})
export class SettingsModule {
}
