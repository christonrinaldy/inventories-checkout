const request = require('supertest');
const expect = require('chai').expect;

const inventorySchema = require('./schemas/Inventories-schema')
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

const typeDefs = gql`
  type Query,
  type Mutation
`;
const schema = makeExecutableSchema({
    typeDefs: [typeDefs, inventorySchema.typeDefs],
    resolvers: [inventorySchema.resolvers]
})
const queryData = {
    query: `mutation {
        inputProductToCart(prod: { sku: "234234" })
      }`,
    // variables: {sku: "234234"},
};
const queryData1 = {
    query: `mutation {
        inputProductToCart(prod: { sku: "notexist" })
      }`
};
const queryData2 = {
    query: `mutation {
        checkOutCart {
            items,
            cost
          }
      }`
};

describe('testing graphQl', () => {
    let server, URL;
    before(() => {
        server = new ApolloServer({ schema });
        server.listen().then(({ url }) => {
            URL = url;
            console.log(`🚀  Server ready at ${url}`);
        })
    });

    it('should be returning success', async () => {
        const response = await request(URL).post('/').send(queryData)
        expect(response.body.data.inputProductToCart).to.eq("success")

    })
    it('should be returning not found', async () => {
        const response = await request(URL).post('/').send(queryData1)
        expect(response.body.errors[0].message).to.eq("Request failed with status code 404")

    })
    it('should return items and price', async() => {
        const response = await request(URL).post('/').send(queryData2)
        expect(response.body.data.checkOutCart).haveOwnProperty("items");
        expect(response.body.data.checkOutCart).haveOwnProperty("cost");
    })

})