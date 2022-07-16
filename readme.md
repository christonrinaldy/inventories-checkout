Open terminal on the services/Transaction folder:
    - type npm start and press Enter
    - it should appear on the terminal app is to listening http://localhost:3001/

Open terminal on the orchestrator folder:
    - type npm start and press Enter
    - it should appear on the terminal 🚀  Server ready at http://localhost:4000/

To test, open terminal on the orchestrator folder:  
    - stop ongoing process on terminal
    - type npm run test and press Enter

Copy http://localhost:4000/ to browser and type the queries
Queries Example:
    1. To insert product by sku:
        mutation {
            inputProductToCart(prod: { sku: "A304SD" })
        }  
        Output Example:
        {
            "data": {
                "inputProductToCart": "success"
            }
        }         


    2. To checkout:
        mutation {
            checkOutCart {
                items, cost
            }  
        }
        Output Example:
        {
            "data": {
                "checkOutCart": {
                "items": "Alexa Speaker",
                "cost": 109.5
                }
            }
        }


