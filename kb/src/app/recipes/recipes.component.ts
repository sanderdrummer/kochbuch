import {Component, OnInit, state} from '@angular/core';
import {Subscription} from "rxjs";
import {RecipeStore} from "../shared/stores/recipe.store";
import {RecipeState} from "../shared/stores/recipe.state";
import {FormGroup, FormBuilder} from "@angular/forms";
import {RecipeModel} from "../shared/models/recipe.model";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'kb-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    recipesSubscription:Subscription;
    state:RecipeState;
    filterForm: FormGroup;

    constructor(private router:Router, private activeRoute:ActivatedRoute, private store:RecipeStore, fb:FormBuilder) {
        this.recipesSubscription = store.state$.subscribe((state:RecipeState) => {
            this.state = state;
            console.log(state);
        });

        this.filterForm = fb.group({
            text: [],
            categories: []
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(){
        this.recipesSubscription.unsubscribe();
    }

    selectRecipe(recipe:RecipeModel) {
        this.store.selectRecipe(recipe);
        this.router.navigate([recipe.title], {relativeTo: this.activeRoute});
    }

    addRecipe() {
        this.store.selectRecipe(null);
        this.router.navigate(['create'], {relativeTo: this.activeRoute});
    }

}
