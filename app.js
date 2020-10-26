import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import cors from "cors";
import jwt from "jsonwebtoken";
import { refreshTokens } from "./auth";

const SECRET = "sdfjkl32lkjiodsjlmcvx";
const SECRET2 = "sgfds4325rfgd342jlmcvx";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolver"))
);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors("*"));

const addUser = async (req, res, next) => {
  const token = req.headers["x-token"];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(token, refreshToken, SECRET);
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const graphqlPath = "/graphql";

const graphqlServer = new ApolloServer({
  schema,
  tracing: true,
  onError: {},
  subscriptions: {
    path: "/subscriptions",
    
  },
  context: async ({ req, connection }) => {
    return {
      user: connection ? connection.context : req.user,
      SECRET,
      SECRET2,
    };
  },
});

graphqlServer.applyMiddleware({ app, graphqlPath });

app.get("/", (req, res) => {
  console.log(req.headers);
  res.json({
    msg: "안녕",
  });
});

export default app;
