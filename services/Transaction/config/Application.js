const Cart = require("../entities/Cart");

class Application {
    constructor() {

    }
    static #application;
    #cart;

    static getInstance() {
        if (this.#application == null) {
            this.#application = new Application()
        }
        return this.#application;
    }
    getSessionCart() {
        if(this.#cart == null) {
            this.#cart = new Cart();
        }
        return this.#cart
    }
    clearCart() {
        this.#cart.clearCart();
    }
}
module.exports = Application