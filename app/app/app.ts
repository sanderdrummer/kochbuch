module WP {

    angular.module('wpBlog')
    .config([
        '$compileProvider',
        '$httpProvider',
        function ($compileProvider, $httpProvider) {

            $compileProvider.debugInfoEnabled(false);

            //Disable legacy $http success and error promises
            $httpProvider.useLegacyPromiseExtensions = false;
            $httpProvider.useApplyAsync(true);
        }
    ])
    // .constant('apiUrl', 'http://tobip.kochab.uberspace.de/blameItOnBernie/wp-json/wp/v2/')
    .constant('apiUrl', 'http://localhost:3000/wordpress/wp-json/wp/v2/')
    .component('wpApp', {
        templateUrl: 'app.html'
    })
}