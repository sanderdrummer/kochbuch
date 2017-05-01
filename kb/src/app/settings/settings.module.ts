import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings.component';
import {SettingsRouting} from './settings.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SettingsRouting,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [LoginComponent, SettingsComponent]
})
export class SettingsModule { }
