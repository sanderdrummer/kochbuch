import {RecipeModel} from './recipe.model';
/**
 * Created by funkp on 26.02.2017.
 */
export class RecipeState {
    categories: any[];
    recipes: RecipeModel[];
    filteredRecipes: RecipeModel[];
    selectedRecipe: RecipeModel;
    filter: any;

    constructor(config: any) {
        this.categories = config.categories || [];
        this.recipes = config.recipes || [];
        this.filteredRecipes = config.filteredRecipes || [];
        this.selectedRecipe = config.selectedRecipe || null;
        this.filter = config.filter || {};
    }

    filterRecipes() {
        const maxLength = 150;
        let currentLength = 0;
        return this.filteredRecipes = this.recipes.filter((recipe: RecipeModel) => {

            let matchingText = true;
            let matchingCategory = true;
            let matching;

            if (this.filter && this.filter.text) {
                const fuzzyMatching = this.filter.text.split(' ');
                matchingText = fuzzyMatching.every((subText: string) => {
                    return recipe.title.toLowerCase().indexOf(subText.toLowerCase()) > -1;
                });
            }

            if (this.filter && this.filter.categories && this.filter.categories.length) {
                matchingCategory = this.filter.categories.every((category: string) => {
                    return recipe.categories.indexOf(category) > -1;
                });
            }

            matching = matchingText && matchingCategory;

            if (matching) {
                currentLength += 1;
            }

            return matching && currentLength < maxLength;
        })
    }
}
