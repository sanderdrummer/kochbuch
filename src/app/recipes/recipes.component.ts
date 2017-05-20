import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {RecipeStore} from './shared/recipe.store';
import {RecipeModel} from './shared/recipe.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'kb-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RecipesComponent implements OnInit {

  filterForm: FormGroup;
  recipes$: Observable<RecipeModel[]>;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private store: RecipeStore, fb: FormBuilder) {
    this.recipes$ = this.store.getRecipes();

    this.filterForm = fb.group({
      text: [],
      categories: []
    });

    this.filterForm.valueChanges.subscribe((values) => {
      this.store.updateRecipeFilter(values);
    });

  }

  ngOnInit() {
    this.store.resetFilter();
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
