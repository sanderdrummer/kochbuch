
module WP {

    class Products implements ng.IComponentController{

        products: any[];

        static $inject = ['productService'];
        constructor(private productService) {}

        $onInit(){
            this.updateList();
        }

        updateList() {
            console.log('test');
            this.productService.get()
                .then((res) => {
                    console.log(res);
                    this.products = res.data;
                });
        }
    }

    angular.module('cook')
        .component('products', {
            templateUrl: 'components/products/products.html',
            controller: Products,
            controllerAs: 'ctrl',

        });
}