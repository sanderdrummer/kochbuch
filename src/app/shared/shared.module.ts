import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdListModule, MdProgressSpinnerModule,
  MdToolbarModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdProgressSpinnerModule,
  ],
  exports: [
    MdButtonModule,
    MdListModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdProgressSpinnerModule,
  ]
})
export class SharedModule {

}
