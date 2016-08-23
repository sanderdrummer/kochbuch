
module WP {

    import RecipesService = RSU.RecipesService;
    class Recipe implements ng.IComponentController{

        loading:boolean;
        recipe

        static $inject = [
            '$stateParams',
            'recipesService'];
        constructor(private $stateParams,
                    private recipesService:RecipesService) {}

        $onInit() {
            if (this.$stateParams.id) {
                this.loading = true;
                this.recipesService.single(this.$stateParams.id)
                    .then((res) => {
                        this.loading = false;
                        this.recipe = res.data;
                    }, () => {
                        this.loading = false;
                    });
            }
        }

    }

    angular.module('cook')
        .component('recipe', {
            templateUrl: 'components/recipes/recipe/recipe.html',
            controller: Recipe,
            controllerAs: 'ctrl',
        });
}