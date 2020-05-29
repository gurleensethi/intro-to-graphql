const connection = require("./db/connection");
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

console.log(process.cwd());

function loadSchemas() {
  return ["coupon", "product", "user"]
    .map((name) => {
      const filePath = path.join(process.cwd(), "types", name, `${name}.gql`);
      return fs.readFileSync(filePath).toString();
    })
    .join("\n");
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
    resolvers: {
      Query: {},
    },
  });

  const { url } = await server.listen({ port: 3000 });

  console.log(`GraphlQL running on ${url}`);
};

try {
  start();
} catch (error) {
  console.error(error);
}
