
module WP {

    class Recipes implements ng.IComponentController{

        recipes;

        static $inject = ['recipesService'];
        constructor(private recipesService) {}

        $onInit(){
            this.getRecipes();
        }

        getRecipes() {
            this.recipesService.get()
                .then((res)=>{
                   this.recipes = res.data;
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