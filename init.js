import "./db";
import app from "./app";
import dotenv from "dotenv";

// for webSocket
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "./app";

dotenv.config();

const PORT = process.env.PORT;

const server = createServer(app);

const handleListening = () => {
  console.log(`Listening on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: "/subscriptions",
    }
  );
};

server.listen(PORT, handleListening);
