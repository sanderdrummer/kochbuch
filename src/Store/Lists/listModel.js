class ListModel {
    name;
    toBasket;
    inBasket;

    constructor(config = {}) {
        this.name = config.name || '';
        this.toBasket = config.toBasket || [];
        this.inBasket = config.inBasket || [];
    }
}

export default ListModel;