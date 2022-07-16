const Application = require("../config/Application");
const DiscountService = require("./DiscountService");
const Inventories = require("./Inventories");


class CheckOutService {
    constructor() {
        this.inventories = Inventories.getInstance();
    }
    application = Application.getInstance();
    static #instace;
    static inventories;
    static getInstance() {
        if (this.#instace == null) {
            this.#instace = new CheckOutService();
        }
        return this.#instace;
    }

    checkOut() {
        let total = 0;
        let discount = 0;
        const cart = this.application.getSessionCart();
        const cartProducts = cart.getProducts();

        cartProducts.forEach(prod => {
            total += prod.price * prod.quantity;
            switch (prod.sku) {
                case "A304SD":
                    discount += DiscountService.discountTypeOne(prod, 3, 10)
                    break;
                case "120P90":
                    discount += DiscountService.discountTypeTwo(prod, 3, 2);
                    break;
                case "43N23P":
                    discount += DiscountService.discountTypeThree(prod, "234234", cartProducts);

            }
        });
        const cost = total - discount;
        const items = cart.getProductsInString()

        this.application.clearCart();

        return { items, cost }
    }
}
module.exports = CheckOutService;