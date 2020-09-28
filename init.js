import "./db";
import app from "./app";
import dotenv from "dotenv";

// for webSocket
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { typeDefs } from "./app";

dotenv.config();

const PORT = process.env.PORT;

const server = createServer(app);

const handleListening = () => {
  console.log(`Listening on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: typeDefs,
    },
    {
      server,
      path: "/subscriptions",
    }
  );
};

server.listen(PORT, handleListening);
