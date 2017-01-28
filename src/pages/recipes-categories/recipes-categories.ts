import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {RecipeStore} from '../../stores/recipe.store';
import {ParserService} from '../../providers/parser.service';
import {FormBuilder} from '@angular/forms';

/*
  Generated class for the RecipesCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes-categories',
  templateUrl: 'recipes-categories.html'
})
export class RecipesCategoriesPage {


  categories$;
  categoriesSubscription;
  loading;
  categoryForm;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public store: RecipeStore,
              public parser: ParserService,
              public fb: FormBuilder,
              public af:AngularFire) {
    this.categories$ = af.database.object('/categories');

    this.categoryForm = fb.group({
      category: []
    })
  }

  ionViewWillLeave(){
    this.categoriesSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.loading = true;
    this.categoriesSubscription = this.store.resolveCategories().subscribe(() => {
      this.loading = false;
    });
  }

  add(title:string){
    const newCategory = {};
    newCategory[title] = title;
    this.categories$.update(newCategory).then(() => this.categoryForm.reset());
  }

  remove(category:string){
    const category$ = this.af.database.object('/categories/'+category);
    category$.remove();
  }

}
