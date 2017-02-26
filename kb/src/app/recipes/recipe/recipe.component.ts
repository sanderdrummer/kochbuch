import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeStore} from "../../shared/stores/recipe.store";
import {RecipeModel} from "../../shared/models/recipe.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'kb-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
    recipe:RecipeModel;
    recipeSubscription:Subscription;
    constructor(router: Router, route: ActivatedRoute, store: RecipeStore) {

        this.recipe = new RecipeModel({});

        this.recipeSubscription = store.state$.map(state => state.selectedRecipe).subscribe(recipe => {

            if (recipe) {
                this.recipe = recipe;
            } else {
                const title = route.snapshot.params['title'];
                store.setSelectedRecipeByTitle(title);
            }
            console.log(recipe);
        })
    }

    ngOnInit() {
    }

    edit() {
        // this.navCtrl.push(RecipesCreateRecipePage);
    }

    addToCart() {
        // this.navCtrl.push(RecipesProductsToListPage);
    }

}
