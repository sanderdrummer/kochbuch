/**
 * Created by Tobias on 22.08.2016.
 */
module RSU {
    'use strict';

    export class RecipesService {
    
        http;
        apiUrl;

        static $inject = ['$http', 'apiUrl'];
        constructor($http: ng.IHttpService, apiUrl) {
            this.http = $http;
            this.apiUrl = apiUrl;
        }

        get() {
            return this.http.get(this.apiUrl + 'recipe', {
                cache:true
            });
        }

        single(id:number) {
            return this.http.get(this.apiUrl + 'recipe/single', {
                params: {
                    id
                }
            });
        }

        add(name:string) {
            return this.http.get(this.apiUrl + 'recipe/create', {
                params: {
                    name
                }
            });
        }

        update(id:number, name:string, description:string) {
            return this.http.get(this.apiUrl + 'recipe/update', {
                params: {
                    id,
                    name,
                    description,
                }
            });
        }

        destroy(id:number) {
            return this.http.get(this.apiUrl + 'recipe/destroy', {
                params: {
                    id
                }
            });
        }

        linkProduct(product_id:number, amount:string, recipe_id:number) {
            return this.http.get(this.apiUrl + 'item/create', {
                params: {
                    product_id,
                    amount,
                    recipe_id
                }
            });
        }

        upateProduct(id:number, product_id:number, amount:string, recipe_id:number) {
            return this.http.get(this.apiUrl + 'item/update', {
                params: {
                    id,
                    product_id,
                    amount,
                    recipe_id
                }
            });
        }

        unLinkProduct(id:number) {
            return this.http.get(this.apiUrl + 'item/destroy', {
                params: {
                    id
                }
            });
        }

    }

    angular.module('cook')
        .service('recipesService', RecipesService);
}