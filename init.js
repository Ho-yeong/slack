import "./db";
import app from "./app";
import dotenv from "dotenv";

// for webSocket
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "./app";
import { refreshTokens } from "./auth";
import jwt from "jsonwebtoken";

dotenv.config();


const SECRET = "sdfjkl32lkjiodsjlmcvx";

const PORT = process.env.PORT;

const server = createServer(app);

const handleListening = () => {
  console.log(`Listening on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: async ({token, refreshToken} , webSocket) => {
        if (token && refreshToken) {
          let user = null;
          try {
            const payload = jwt.verify(token, SECRET);
            user = payload.user;
          } catch (err) {
            const newTokens = await refreshTokens(token, refreshToken, SECRET);
            user = newTokens.user;
          }
          if (!user){
            throw new Error("Invalid auth tokens");
          }
          return true;
        }
      throw new Error('Missing auth token!');
      },
    },
    {
      server,
      path: "/subscriptions",
    }
  );
};

server.listen(PORT, handleListening);
