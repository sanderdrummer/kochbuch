import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ListsPage} from '../lists/lists';
import {ListStore} from '../../stores/list.store';
import {AngularFire} from 'angularfire2';
import {ParserService} from '../../providers/parser.service';
import {FormBuilder} from '@angular/forms';
import {ListModel} from '../../models/list.model';
import {RecipeStore} from '../../stores/recipe.store';
import {ListsListPage} from '../lists-list/lists-list';

/*
 Generated class for the RecipesProductsToList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-recipes-products-to-list',
  templateUrl: 'recipes-products-to-list.html'
})
export class RecipesProductsToListPage extends ListsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public store: ListStore,
              public af: AngularFire,
              public parser: ParserService,
              public recipeStore:RecipeStore,
              fb: FormBuilder) {
    super(navCtrl, navParams, store, af, parser, fb);
  }

  addToCart(list:ListModel){
    const selectedList$ = this.af.database.object('/lists/' + list.title);
    list.forBasket = list.forBasket.concat(this.recipeStore.selectedRecipe.products);
    selectedList$.update(list).then(() => {
      this.store.selectedList = list;
      this.navCtrl.push(ListsListPage);
    });
  }
}
