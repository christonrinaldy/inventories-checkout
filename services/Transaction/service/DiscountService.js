class DiscountService {
    static discountTypeOne(product, minCount, percentage) {
        let discount = 0;
        if (product.quantity >= minCount) {
            discount = product.quantity * product.price * percentage / 100
        }
        return discount;
    }
    static discountTypeTwo(product, qtyTrget, qtyPaid) {
        let discount = 0;
        if (product.quantity >= qtyTrget) {
            discount = (qtyTrget - qtyPaid) * product.price
        }
        return discount;
    }
    static discountTypeThree(prodTrget, sku, cart) {
        let discount = 0;
        let qtyTrget = prodTrget.quantity;
        cart.forEach(prod => {
            if (prod.sku == sku) {
                if (prod.quantity <= qtyTrget) {
                    discount += prod.quantity * prod.price;
                } else {
                    discount += qtyTrget * prod.price;
                }
            }
        });
        return discount;
    }
}
module.exports = DiscountService