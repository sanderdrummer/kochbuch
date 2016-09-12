module WP {
    'use strict';

    export class RecipesState {

        recipes:Recipe[];

        constructor() {}
    }

    angular.module('cook')
        .service('recipesState', RecipesState);
}