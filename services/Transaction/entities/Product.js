class Product {
    constructor(sku, name, price, quantity) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    sku;
    quantity;
    name;
    price;

    addQuantity(n = 1) {
        if (n == null || n == undefined) {
            this.quantity += 1
        } else {
            this.quantity += n;
        }
    }
    reduceQuantity(n) {
        if (n == null || n == undefined) {
            this.quantity -= 1
        } else {
            this.quantity -= n;
        }
    }
    setQuantity(n) {
        if (n < 0) return false;
        this.quantity = n;
    }
}
module.exports = Product