import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RecipeStore} from '../../stores/recipe.store';
import {RecipesCreateRecipePage} from '../recipes-create-recipe/recipes-create-recipe';
import {RecipeModel} from '../../models/recipe.model';

/*
  Generated class for the RecipesRecipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes-recipe',
  templateUrl: 'recipes-recipe.html'
})
export class RecipesRecipePage {
  recipe:RecipeModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public store:RecipeStore) {
    this.recipe = this.store.selectedRecipe;
  }

  ionViewWillEnter() {
    this.recipe = this.store.selectedRecipe;
  }
  edit(){
    this.navCtrl.push(RecipesCreateRecipePage);
  }
}
