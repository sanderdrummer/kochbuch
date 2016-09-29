import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {ListComponent} from './lists/list/list.component';
import {ListsComponent} from './lists/lists.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductsComponent} from './products/products.component';
import {HttpModule} from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        ListsComponent,
        ListComponent,
        ProductsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
