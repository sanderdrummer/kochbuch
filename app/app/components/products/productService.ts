/**
 * Created by Tobias on 22.08.2016.
 */
module RSU {
    'use strict';

    export class ProductService {
    
        http;
        apiUrl;

        static $inject = ['$http', 'apiUrl'];
        constructor($http: ng.IHttpService, apiUrl) {
            this.http = $http;
            this.apiUrl = apiUrl;
        }

        get() {
            return this.http.get(this.apiUrl + 'product');
        }

        create(name:string) {
            return this.http.get(this.apiUrl + 'product/create', {
                params: {
                    name
                }
            });
        }

        update(id:number, name:string) {
            return this.http.get(this.apiUrl + 'product/update', {
                params: {
                    id,
                    name
                }
            });
        }

        destroy(id:number) {
            return this.http.get(this.apiUrl + 'product/destroy', {
                params: {
                    id
                }
            });
        }

    }

    angular.module('cook')
        .service('productService', ProductService);
}