import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder} from '@angular/forms';
import {AngularFire} from 'angularfire2';
import {RecipeStore} from '../../stores/recipe.store';
import {RecipeModel} from '../../models/recipe.model';

/*
  Generated class for the RecipesCreateRecipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes-create-recipe',
  templateUrl: 'recipes-create-recipe.html'
})
export class RecipesCreateRecipePage {

  recipeForm;
  recipe$;
  baseLink:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, fb:FormBuilder, public af:AngularFire, public store:RecipeStore) {
    this.baseLink = '/recipes/';
    this.recipeForm = fb.group({
      title:[],
      description: [],
      products: fb.array([
        fb.group({
          product: [],
          amount: []
        })
      ])
    });
  }

  createOrUpdateRecipe(values:RecipeModel) {
    if (this.store.slectedRecipe) {
      this.recipe$ = this.af.database.object(this.baseLink + this.store.slectedRecipe.title);
    } else {
      this.recipe$ = this.af.database.object(this.baseLink + values.title);
    }

    this.recipe$.update(values);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesCreateRecipePage');
  }

}
