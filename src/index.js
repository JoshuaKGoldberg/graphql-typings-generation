import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { characters } from "./data.js";

const schema = buildSchema(`
  type Character {
    age: Int
    cartoons: [String]
    id: ID!
    name: String!
  }
  
  type Query {
    characters(cartoon: String): [Character!]
    hello: String
  }
`);

const root = {
  characters: ({ cartoon }) =>
    characters.filter((character) => character.cartoons.includes(cartoon)),
  hello: () => "Hello world! ✨",
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema: schema,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
