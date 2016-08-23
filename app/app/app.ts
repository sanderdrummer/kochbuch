module WP {

    angular.module('cook')
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
    .constant('apiUrl', 'http://localhost:3001/kochbuch/api/listApi/public/')
    .component('app', {
        templateUrl: 'app.html'
    })
}