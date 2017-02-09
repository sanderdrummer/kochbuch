import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormArray, Validators} from '@angular/forms';
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
  baseLink: string;
  title: string;
  submitButtonLabel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb: FormBuilder, public af: AngularFire, public store: RecipeStore) {
    this.title = '';
    this.submitButtonLabel = '';
    this.baseLink = '/recipes/';
    this.recipeForm = fb.group({
      title: ['', Validators.required],
      description: [],
      categories: [],
      // categories: fb.array([this.createCategory()]),
      products: fb.array([this.createProduct()])
    });
  }

  ionViewWillEnter() {
    if (this.store.selectedRecipe) {
      this.initCreate();
    } else {
      this.initUpdate();
    }
  }

  initCreate(){
    this.initializeChildForms(this.store.selectedRecipe.products, this.store.selectedRecipe.categories);
    this.recipeForm.patchValue(this.store.selectedRecipe);

    this.title = this.store.selectedRecipe.title;
    this.submitButtonLabel = this.title + ' aktualisieren';
  }

  initUpdate(){
    this.recipeForm.reset();
    this.title = 'Neues Rezept';
    this.submitButtonLabel = 'Neues Rezept anlegen';

  }

  initializeChildForms(products, categories) {
    products.forEach(() => {
      this.addProduct()
    });
  }

  createCategory() {
    return this.fb.group({
      category: []
    })
  }

  createProduct() {
    return this.fb.group({
      title: [],
      amount: []
    })
  }

  addProduct() {
    this.recipeForm.controls['products'].push(this.createProduct());
  }

  removeItem(type: string, index: number) {
    const control = <FormArray>this.recipeForm.controls[type];
    control.removeAt(index);
  }

  createOrUpdateRecipe(values: RecipeModel) {
    if (this.store.selectedRecipe) {
      this.recipe$ = this.getSelectedFireBase();
    } else {
      this.recipe$ = this.af.database.object(this.baseLink + values.title);
    }

    this.recipe$.update(values).then(() => {
        this.store.selectedRecipe = values;
        this.navCtrl.pop()
      }, () => {
        console.log('fehler');
      }
    );
  }

  getSelectedFireBase() {
    return  this.af.database.object(this.baseLink + this.store.selectedRecipe.title);
  }

  deleteRecipe() {
    this.recipe$ = this.getSelectedFireBase();
    this.recipe$.remove().then(() => this.navCtrl.popToRoot());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesCreateRecipePage');
  }

}
