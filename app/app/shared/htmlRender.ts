/**
 * Created by Tobias on 13.08.2016.
 */

module WP {

    angular.module('wpBlog')
    .directive('htmlRender', ['$compile', function($compile){
        const link = function (scope, elem) {
            if (scope.html) {
                var template = $compile(scope.html)(scope);
                elem.append(template);
            }
        };

        return {
            link: link,
            scope: {
                html: '<',
            },
        }
    }])
}