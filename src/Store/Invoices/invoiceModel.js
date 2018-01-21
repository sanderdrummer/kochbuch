export class InvoiceModel {

    from;
    to;
    user;
    category;
    description;
    value;

    constructor(config = {}) {
        this.from = config.from || Date.now();
        this.to = config.from;
        this.description = config.description || '';
        this.value = config.value;
    }
}