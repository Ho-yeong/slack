import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolver";
import Connectors from "./connector";

const app = express();
const path = "/graphql";
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path });

app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});

export default app;
