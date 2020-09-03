import express from "express";
import { ApolloServer } from "apollo-server-express";

import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import cors from "cors";

const SECRET = "sdfjkl32lkjiodsjlmcvx";
const SECRET2 = "sgfds4325rfgd342jlmcvx";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolver"))
);

const app = express();
app.use(cors("*"));

const graphqlPath = "/graphql";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  onError: {},
  context: {
    SECRET,
    SECRET2,
  },
});
server.applyMiddleware({ app, graphqlPath });

app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});

export default app;
