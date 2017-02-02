import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {RecipeStore} from '../../stores/recipe.store';
import {ParserService} from '../../providers/parser.service';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  filteredRecipes: RecipeModel[];
  loading: boolean;
  filterForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public store: RecipeStore,
              public af: AngularFire,
              public parser: ParserService,
              fb: FormBuilder) {
    this.recipes$ = af.database.object('/recipes');

    this.filterForm = fb.group({
      text: [],
      categories: []
    });

    this.filterForm.valueChanges.subscribe((values) => {
      this.filterRecipes(values)
    });

    this.loading = true;
  }

  ionViewWillEnter() {
    this.recipesSubscription = this.store.resolveRecipes().subscribe(() => {
      this.filterRecipes(this.filterForm.value);
      this.loading = false;
    });
  }

  ionViewWillLeave() {
    this.recipesSubscription.unsubscribe();
  }

  filterRecipes(filter) {
    const maxLength = 150;
    var currentLength = 0;
    this.filteredRecipes = this.store.recipes.filter((recipe: RecipeModel) => {

      var matchingText = true;
      var matchingCategory = true;
      var matching;

      if (filter && filter.text) {
        const fuzzyMatching = filter.text.split(' ');
        matchingText = fuzzyMatching.every((subText: string) => {
          return recipe.title.toLowerCase().indexOf(subText.toLowerCase()) > -1;
        });
      }

      if (filter && filter.categories && filter.categories.length) {
        matchingCategory = filter.categories.every((category: string) => {
          return recipe.categories.indexOf(category) > -1;
        });
      }

      matching = matchingText && matchingCategory;

      if (matching) {
        currentLength += 1;
      }

      return matching && currentLength < maxLength;
    })
  }

  selectRecipe(recipe: RecipeModel) {
    this.store.selectedRecipe = recipe;
    this.navCtrl.push(RecipesRecipePage);
  }

  addRecipe() {
    this.store.selectedRecipe = null;
    this.navCtrl.push(RecipesCreateRecipePage);
  }

}
