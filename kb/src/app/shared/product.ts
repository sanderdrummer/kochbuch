export class Product {
    id: number;
    name:string;

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
    }
}
