export class Product {
    id: number;
    name:string;

    constructor(config:any) {
        this.id = config.id;
        this.name = config.name;
    }
}
