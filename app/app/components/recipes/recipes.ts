
module WP {

    class Recipes implements ng.IComponentController{

        state:RecipesState;

        static $inject = ['recipesService', 'recipesState'];
        constructor(private recipesService, recipesState) {}

        $onInit(){
            this.getRecipes();
        }

        getRecipes() {
            this.recipesService.get()
                .then((res)=>{
                   this.state.recipes = res.data;
                });
        }
    }

    angular.module('cook')
        .component('recipes', {
            templateUrl: 'components/recipes/recipes.html',
            controller: Recipes,
            controllerAs: 'ctrl',
        });
}