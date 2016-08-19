module WP {
    angular.module('wpBlog')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
        .state('home', {
            url: "/home",
            template: "<home></home>"
        })
        .state('posts', {
            url: "/posts",
            template: "<posts></posts>"
        })
        .state('category', {
            url: "/posts/:category",
            template: "<posts></posts>"
        })
        .state('category.post',{
            url: "/:id",
            views: {
                posts:{
                    template: "<post></post>"
                }
            },
            onEnter: function(){
                document.body.classList.add('noScroll');
            },
            onExit: function(){
                document.body.classList.remove('noScroll');
            }
        })
        .state('post', {
            url: "/post/:id",
            template: "<post></post>"
        })
        .state('page', {
            url: "/page/:id",
            template: "<page></page>"
        })
    }]);
}