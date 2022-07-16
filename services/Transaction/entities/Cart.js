class Cart {
    constructor() {

    }
    #products = [];
    #productInString = ""
    getProducts = () => {
        return this.#products
    }
    getProductsInString() {
        return this.#productInString;
    }

    addProduct(product) {
        if (this.#products.length == 0) {
            this.#productInString += product.name
        } else {
            this.#productInString += ", " + product.name
        }
        let exist = false
        for (let i = this.#products.length - 1; i > -1; i--) {
            if (this.#products[i].sku == product.sku) {
                exist = true;
                this.#products[i].addQuantity(1);
                break;
            }
        }
        if (!exist) {
            let cloneProduct = Object.assign(Object.create(Object.getPrototypeOf(product)), product)
            cloneProduct.setQuantity(1);

            this.#products.push(cloneProduct);
        }
    }
    isNull() {
        return this.#products == null || this.#products.length == 0;
    }
    clearCart() {
        this.#productInString = "";
        this.#products = [];
    }


}
module.exports = Cart