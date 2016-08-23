
module WP {

    import RecipesService = RSU.RecipesService;
    class AddRecipe implements ng.IComponentController{

        recipe:Recipe;

        loading:boolean;

        static $inject = ['recipesService'];
        constructor(private recipesService:RecipesService) {}

        addRecipe(name) {
            this.loading = true;
            this.recipesService.add(name)
            .then(
                (res) => {
                    if (res.data) {
                        this.recipe = res.data;
                    }
                    this.loading = false;
                }, () => {
                this.loading = false;
            });
        }

        update() {
            this.loading = true;
            this.recipesService.update(this.recipe.id, this.recipe.name, this.recipe.description)
                .then(
                    (res) => {
                        this.loading = false;
                    }, () => {
                        this.loading = false;
                    });
        }

        addProduct() {

        }

        addNewProduct() {

        }
    }

    angular.module('cook')
        .component('addRecipe', {
            templateUrl: 'components/recipes/addRecipe/addRecipe.html',
            controller: AddRecipe,
            controllerAs: 'ctrl',
            bindings: {
                recipe: '<'
            }
        });
}