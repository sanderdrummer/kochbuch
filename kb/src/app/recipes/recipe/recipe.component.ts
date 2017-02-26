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
    constructor(private router: Router, private route: ActivatedRoute, private store: RecipeStore) {

        this.recipe = new RecipeModel({});

        this.recipeSubscription = store.state$.map(state => state.selectedRecipe).subscribe(recipe => {

            if (recipe) {
                this.recipe = recipe;
            } else {
                const title = route.snapshot.params['title'];
                store.setSelectedRecipeByTitle(title);
            }
        });
    }

    ngOnInit() {
    }

    edit() {
        this.router.navigate(['update'], {relativeTo: this.route});
    }

    addToCart() {
        this.router.navigate(['add'], {relativeTo: this.route});

    }

}
