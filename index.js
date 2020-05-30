const connection = require("./db/connection");
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const couponResolver = require("./types/user/user.resolver");
const productResolver = require("./types/product/product.resolver");
const userResolver = require("./types/user/user.resolver");

const models = ["coupon", "product", "user"];

function loadSchemas() {
  return models
    .map((name) => {
      const filePath = path.join(process.cwd(), "types", name, `${name}.gql`);
      return fs.readFileSync(filePath).toString();
    })
    .join("\n");
}

function merge(...args) {
  const result = {};
  args.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!!result[key] && typeof result[key] === "object") {
        result[key] = merge(result[key], obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
  });
  return result;
}

function loadResolvers() {
  return merge(couponResolver, productResolver, userResolver);
}

const start = async () => {
  await connection.connectDB();

  const schemas = loadSchemas();

  const rootSchema = `
    type Query
    type Mutation    
  `;

  const server = new ApolloServer({
    typeDefs: [rootSchema, schemas],
    resolvers: loadResolvers(),
  });

  const { url } = await server.listen({ port: 3000 });

  console.log(`GraphlQL running on ${url}`);
};

try {
  start();
} catch (error) {
  console.error(error);
}
