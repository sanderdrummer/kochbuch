import {Component, OnInit, state} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {RecipeState} from './shared/recipe.state';
import {RecipeStore} from './shared/recipe.store';
import {RecipeModel} from './shared/recipe.model';

@Component({
  selector: 'kb-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipesSubscription: Subscription;
  state: RecipeState;
  filterForm: FormGroup;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private store: RecipeStore, fb: FormBuilder) {

    this.filterForm = fb.group({
      text: [],
      categories: []
    });

    this.recipesSubscription = store.state$.subscribe((state: RecipeState) => {
      this.state = state;
    });


    this.filterForm.valueChanges.subscribe((values) => {
      this.store.updateRecipeFilter(values);
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  selectRecipe(recipe: RecipeModel) {
    this.store.selectRecipe(recipe);
    this.router.navigate([recipe.title], {relativeTo: this.activeRoute});
  }

  addRecipe() {
    const recipe = new RecipeModel({});
    this.store.selectRecipe(recipe);
    this.router.navigate(['create'], {relativeTo: this.activeRoute});
  }

}
