/**
 * Created by Tobias on 27.01.2017.
 */
import {Injectable} from '@angular/core';
import {RecipeModel} from '../models/recipe.model';
import {AngularFire} from 'angularfire2';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import {ParserService} from '../parser.service';
import {BehaviorSubject} from "rxjs";
import {RecipeState} from "../models/recipe.state";

@Injectable()
export class RecipeStore {
    state$: BehaviorSubject<RecipeState>;
    state: RecipeState;
    productsUrl: string;
    categoriesUrl: string;

    constructor(public af: AngularFire, public parser: ParserService) {
        this.state = new RecipeState({});
        this.state$ = new BehaviorSubject(this.state);
        this.productsUrl = '/products';
        this.categoriesUrl = '/categories';

        this.resolveRecipes().subscribe();
        this.resolveCategories().subscribe();
    }

    resolveCategories() {
        return this.af.database.object('/categories').map((category) => {
            const categories = [];
            this.parser.parseFireBaseObjToArray(category).forEach((category) => {
                categories.push(category);
            });

            this.updateState({categories});
        });
    }

    resolveRecipes() {
        return this.af.database.object('/recipes').map((obj) => {
            const recipes = [];
            this.parser.parseFireBaseObjToArray(obj).forEach((id) => {
                recipes.push(new RecipeModel(obj[id]));
            });

            this.updateState({recipes});
            this.filterRecipes();
        });
    }

    filterRecipes() {
        const filteredRecipes = this.state.filterRecipes();

        this.updateState({filteredRecipes});
    }

    selectRecipe(selectedRecipe: RecipeModel) {
        this.updateState({selectedRecipe});
    }

    updateState(config) {
        this.state$.next(new RecipeState(Object.assign(this.state, config)));
    }

    setSelectedRecipeByTitle(title: string) {
        const selectedRecipe = this.state.recipes.find(list => list.title === title);
        if (selectedRecipe) {
            this.selectRecipe(selectedRecipe);
        }
    }
}
