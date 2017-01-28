import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {RecipeStore} from '../../stores/recipe.store';
import {ParserService} from '../../providers/parser.service';
import {FormBuilder} from '@angular/forms';
import {RecipesCreateRecipePage} from '../recipes-create-recipe/recipes-create-recipe';
import {RecipeModel} from '../../models/recipe.model';
import {RecipesRecipePage} from '../recipes-recipe/recipes-recipe';

/*
  Generated class for the Recipes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  recipes$: FirebaseObjectObservable<any>;
  recipesSubscription;
  loading:boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public store: RecipeStore,
              public af: AngularFire,
              public parser: ParserService,
              fb: FormBuilder) {
    this.recipes$ = af.database.object('/recipes');
  }
  ionViewWillEnter() {
    this.loading = true;
    this.recipesSubscription = this.recipes$.subscribe((obj) => {
      this.store.recipes = [];
      this.parser.parseFireBaseObjToArray(obj).forEach((id) => {
        this.store.recipes.push(new RecipeModel(obj[id]));
      });
      this.loading = false;
    });
  }

  ionViewWillLeave(){
    this.recipesSubscription.unsubscribe();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  selectRecipe(recipe:RecipeModel) {
    this.store.selectedRecipe = recipe;
    this.navCtrl.push(RecipesRecipePage);
  }

  addRecipe(){
    this.store.selectedRecipe = null;
    this.navCtrl.push(RecipesCreateRecipePage);
  }

}
