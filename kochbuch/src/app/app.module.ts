import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ProductsComponent } from './products/products.component';
import { ListsComponent } from './lists/lists.component';
import {routing} from './app.routing';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {listsReducer} from './lists/lists.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ListsEffects} from './lists/lists.effects';
import {ListsService} from './lists.service';
import {reducer} from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProductsComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    StoreModule.provideStore({
      list:listsReducer
    }),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ListsEffects)

  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
