
module WP {

    class Home implements ng.IComponentController{

        static $inject = [];
        constructor() {}

    }

    angular.module('wpBlog')
        .component('home', {
            templateUrl: 'components/home/home.html',
            controller: Home,
            controllerAs: 'home',
        });
}