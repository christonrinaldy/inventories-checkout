const axios = require("axios")
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Product {
    name: String
  }
  type CheckOutProducts {
      items: String,
      cost: Float
  }

  input InputProduct {
    sku: String
  }

  extend type Mutation {
      checkOutCart: CheckOutProducts,
      inputProductToCart(prod: InputProduct) : String
  }
  extend type Query {
    getProducts: [Product],
  }

`;
const resolvers = {
    Mutation: {
        checkOutCart: async (parents, args, context, info) => {
            const { data } = await axios.post("http://localhost:3001/checkout");
            return data
        },
        inputProductToCart: async(parents, args, context, info) => {
            const {prod} = args;
            const {data} = await axios.post("http://localhost:3001/cart", prod);
            return data
        }
    }
}


module.exports = { typeDefs, resolvers }