import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {FormArray, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RecipeModel} from '../shared/recipe.model';
import {RecipeStore} from '../shared/recipe.store';
import {RecipeState} from '../shared/recipe.state';
import {CategoryModel} from '../recipe-categories/shared/category.model';
import {RecipeService} from '../shared/recipe.service';

@Component({
  selector: 'kb-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  recipe: RecipeModel;
  products: FormArray;
  title: string;
  submitButtonLabel: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private service: RecipeService,
              private store: RecipeStore) {

    this.recipe = new RecipeModel({});
    store.state$.subscribe((state: RecipeState) => {

      if (state.selectedRecipe) {
        this.recipe = state.selectedRecipe;
        this.initUpdate();
      } else {
        const title = route.snapshot.params['title'];
        store.setSelectedRecipeByTitle(title);
        this.initCreate();
      }
    });
  }

  ngOnInit() {
  }

  initUpdate() {
    this.title = this.recipe.title;
    this.submitButtonLabel = this.title + ' aktualisieren';
  }

  initCreate() {
    this.title = 'Neues Rezept';
    this.submitButtonLabel = 'Neues Rezept anlegen';

  }

  deleteProduct(productIndex: number): void {
    this.recipe.products.splice(productIndex, 1);
    this.service.updateRecipe(this.recipe);
  }

  createOrUpdateRecipe(values: RecipeModel) {
    this.recipe.title = values.title;
    this.recipe.description = values.description;
    if (this.recipe.title) {
      this.service.updateRecipe(this.recipe).then(() => {
        this.store.update({selctedRecipe: this.recipe});
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
  }

  deleteRecipe() {
    this.service.deleteRecipe(this.recipe).then(() => {
      this.router.navigate(['recipes']);
    });
  }

}
