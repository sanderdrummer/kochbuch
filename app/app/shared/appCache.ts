/**
 * Created by Tobias on 13.08.2016.
 */
module WP {
    'use strict';

    export class AppCache {

        cache: ng.ICacheObject;

        static $inject = ['$cacheFactory'];
        constructor(private $cacheFactory: ng.ICacheFactoryService) {
            this.cache = $cacheFactory('appCache');
        }

        cacheList(list) {
            list.forEach(item => {
                this.cache.put(item.id, item);
            });
        }
    }

    angular.module('cook')
        .service('appCache', AppCache);
}