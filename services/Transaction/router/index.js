const route = require("express").Router({ mergeParams: true })
const EventEmitter = require('events');

const Application = require("../config/Application");
const CheckOutService = require("../service/CheckOutService");
const Inventories = require("../service/Inventories");

const application = Application.getInstance();
const inventory = Inventories.getInstance()
const cart = application.getSessionCart();
const checkOutService = CheckOutService.getInstance()

route.post('/checkout', (req, res) => {
    const data = checkOutService.checkOut();
    res.status(200).send(data)
})
route.post('/cart', (req, res) => {
    const {sku} = req.body;
    inventory.getProductBySku(sku)
                .then(foundProd => {
                    if (foundProd) {
                        cart.addProduct(foundProd)
                        res.status(200).send("success")
                    } else {
                        res.status(404).send("not found")
                    }
                })
    
})
function main(val) {
    switch (val) {
        case 'checkout':
            checkOutService.checkOut();
            break;
        default:
            inventory.getProductBySku(val)
                .then(res => {
                    if (res) {
                        cart.addProduct(res)
                    } else {
                        console.log("product not found")
                    }
                })
            break;
    }
}
// function stdinLineByLine() {
//     const stdin = new EventEmitter();

//     process.stdin
//         .on('data', data => {
//             stdin.emit('input', data.toString().trimEnd())
//         })
//     // .on('end', () => {
//     //     if (buff.length > 0) stdin.emit('input', buff);
//     // });

//     return stdin;
// }

// const stdin = stdinLineByLine();
// stdin.on('input', main);

module.exports = route