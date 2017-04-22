import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ListStore} from '../../lists/shared/list.store';
import {RecipeStore} from '../shared/recipe.store';

@Component({
  selector: 'kb-recipe-products-to-list',
  templateUrl: './recipe-products-to-list.component.html',
  styleUrls: ['./recipe-products-to-list.component.scss']
})
export class RecipeProductsToListComponent implements OnInit {
  products;

  constructor(public listStore: ListStore, private recipeStore: RecipeStore, private router: Router) {
  }

  ngOnInit() {
    this.recipeStore.state$.subscribe(state => {
      if (state.selectedRecipe && state.selectedRecipe.products) {
        this.products = state.selectedRecipe.products;
      } else {
        this.products = [];
      }
    });
  }

  selectList(list) {
    this.listStore.selectList(list);
    this.listStore.addProductsTolist(list, this.products).then(() => {
      this.router.navigate(['/list', list.title]);
    });
  }
}
