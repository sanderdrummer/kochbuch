import {Component, OnInit} from '@angular/core';
import {RecipeStore} from '../shared/recipe.store';
import {CategoryStore} from './shared/category.store';
import {CategoryModel} from './shared/category.model';
import {Router} from '@angular/router';
import {CategoryService} from './shared/category.service';

@Component({
  selector: 'kb-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss']
})
export class RecipeCategoriesComponent implements OnInit {

  categories$;

  constructor(private categoryStore: CategoryStore,
              private categroyService:CategoryService,
              private router:Router) {
    this.categories$ = categoryStore.state$.map(state => state.categories);
  }

  selectCategory(category:CategoryModel):void {
    this.categoryStore.selectCategory(category);
    this.navigate(category);
  }

  navigate(category) {
    this.router.navigate(['/recipes/categories', category.title]);
  }

  addNewCategory(){
    const category = new CategoryModel({title: 'Kategorie'});
    this.categoryStore.selectCategory(category);
    this.navigate(category);
  }

  deleteCategory(category:CategoryModel):void {
    this.categroyService.deleteCategory(category);
  }

  ngOnInit() {}

}
