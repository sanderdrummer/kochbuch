import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AuthMethods, AuthProviders, AngularFireModule} from 'angularfire2';
import {ListsPage} from '../pages/lists/lists';
import {ProductsPage} from '../pages/products/products';
import {ListsListPage} from '../pages/lists-list/lists-list';
import {ListStore} from '../stores/list.store';
import {ParserService} from '../providers/parser.service';
import {AddProductToListModalPage} from '../pages/add-product-to-list-modal/add-product-to-list-modal';
import {AuthService} from '../providers/auth.service';
import {RecipesPage} from '../pages/recipes/recipes';
import {RecipesRecipePage} from '../pages/recipes-recipe/recipes-recipe';
import {RecipesCategoriesPage} from '../pages/recipes-categories/recipes-categories';
import {RecipeStore} from '../stores/recipe.store';
import {RecipesCreateRecipePage} from '../pages/recipes-create-recipe/recipes-create-recipe';
import {RecipesProductsToListPage} from '../pages/recipes-products-to-list/recipes-products-to-list';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCzRi2uePH1TPhEZhDVakWnN2H2HVRS-8U",
  authDomain: "kochbuch-d2626.firebaseapp.com",
  databaseURL: "https://kochbuch-d2626.firebaseio.com",
  storageBucket: "kochbuch-d2626.appspot.com",
  messagingSenderId: "916192258488"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    ListsListPage,
    ProductsPage,
    RecipesPage,
    RecipesCategoriesPage,
    RecipesRecipePage,
    RecipesCreateRecipePage,
    AddProductToListModalPage,
    RecipesProductsToListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListsPage,
    ListsListPage,
    ProductsPage,
    RecipesPage,
    RecipesCategoriesPage,
    RecipesCreateRecipePage,
    RecipesRecipePage,
    AddProductToListModalPage,
    RecipesProductsToListPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ListStore, RecipeStore, ParserService, AuthService]
})
export class AppModule {
}
