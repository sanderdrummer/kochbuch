module WP {
    angular.module('cook')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/recipes");

        $stateProvider
        .state('recipes', {
            url: "/recipes",
            template: "<recipes></recipes>"
        })
        .state('recipes.recipe',{
            url: "/show/:id",
            views: {
                recipe:{
                    template: "<recipe></recipe>"
                }
            },
            onEnter: function(){
                document.body.classList.add('noScroll');
            },
            onExit: function(){
                document.body.classList.remove('noScroll');
            }
        })
        .state('recipes.addRecipe',{
            url: "/add",
            views: {
                recipe:{
                    template: "<add-recipe></add-recipe>"
                }
            },
            onEnter: function(){
                document.body.classList.add('noScroll');
            },
            onExit: function(){
                document.body.classList.remove('noScroll');
            }
        })
        .state('recipes.addRecipe.products', {
            url: "/products",
            template: "<products></products>"
        })
        .state('list', {
            url: "/list",
            template: "<list></list>"
        })
        .state('list.products', {
            url: "/products",
            template: "<products></products>"
        })
            .state('products', {
                url: "/products",
                template: "<products></products>"
            })

    }]);
}