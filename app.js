import express from "express";
import { ApolloServer } from "apollo-server-express";

import Connectors from "./connector";

import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { trace } from "console";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolver"))
);

const app = express();
const graphqlPath = "/graphql";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: {
    user: {
      id: "5f0b29203b254440341d7864",
    },
  },
});
server.applyMiddleware({ app, graphqlPath });

app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});

export default app;
