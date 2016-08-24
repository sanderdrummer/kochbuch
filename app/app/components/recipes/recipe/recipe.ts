
module WP {

    import RecipesService = RSU.RecipesService;
    class Recipe implements ng.IComponentController{

        loading:boolean;
        edit:boolean;
        recipe;


        static $inject = [
            '$stateParams',
            'recipesService'];
        constructor(private $stateParams,
                    private recipesService:RecipesService) {
            this.edit = false;
        }

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

        toggleEdit() {
            this.edit = !this.edit;
        }

    }

    angular.module('cook')
        .component('recipe', {
            templateUrl: 'components/recipes/recipe/recipe.html',
            controller: Recipe,
            controllerAs: 'ctrl',
        });
}