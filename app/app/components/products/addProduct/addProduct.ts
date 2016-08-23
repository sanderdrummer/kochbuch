
module WP {

    class AddProduct implements ng.IComponentController{


        product:{
            name:string;
            amount?:string;
        };

        updateList: () => any;

        static $inject = ['productService'];
        constructor(private productService) {}

        create(){
            console.log(this.product );
            this.productService.create(this.product.name)
                .then(() => {
                    console.log('done' );
                    this.updateList();
                });
        }




    }

    angular.module('cook')
        .component('addProduct', {
            templateUrl: 'components/products/addProduct/addProduct.html',
            controller: AddProduct,
            controllerAs: 'addProduct',
            bindings: {
                list: '<',
                recipe: '<',
                updateList: '&'
            }
        });
}