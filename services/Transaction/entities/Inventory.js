class Inventory {
    constructor() {

    }
    #products = [];

    getProducts = () => {
        return this.#products
    }
    addProduct(product) {
        var temp = []
        temp = temp.concat(...this.#products, product);
        this.#products = temp;
    }
    isNull() {
        return this.#products == null || this.#products.length == 0;
    }

}
module.exports = Inventory