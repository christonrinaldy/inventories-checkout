const fs = require("fs");
const Product = require("../entities/Product");

class Inventories {
    constructor() {
        this.initiateInventories()
    }
    static #instance;
    #products;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new Inventories()
        }
        return this.#instance;
    }
    getProducts() {
        return this.#products
    }
    initiateInventories() {
        fs.readFile("./../../store.json", ((err, data) => {
            if (err) {
                console.log(err)
            } else {
                var parsedData = JSON.parse(data);
                if (parsedData.length == 0) {
                    this.#products = null;
                } else {
                    Array(3).m
                    this.#products = parsedData.map(val => {
                        const { sku, name, price, quantity } = val;
                        return val = new Product(sku, name, price, quantity);
                    })
                }
            }
        }))
    }
    getProductBySku(sku) {
        return new Promise((resolve, reject) => {
            if (this.#products == null || this.#products.length == 0) return null;
            var res = this.#products.filter(val => { return val.sku == sku });
            resolve(res.length == 0 ? false : res.pop())
        })

    }
}
module.exports = Inventories