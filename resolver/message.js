import Message from "../models/messages";
import User from "../models/user";

import requiresAuth from "../permissions";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => {
          return payload.channelId === args.channelId;
        }
      ),
    },
  },
  Message: {
    user: async ({ userId }, arg, { user }) => {
      return await User.findById(userId);
    },
  },
  Query: {
    messages: requiresAuth.createResolver(
      async (_, { channelId }, { user }) => {
        const Messages = await Message.find({ channelId }).sort({
          createdAt: 1,
        });

        return Messages;
      }
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(
      async (_, { text, channelId }, { user }) => {
        try {
          const message = await Message.create({
            text,
            channelId,
            userId: user.id,
            createdAt: new Date(),
          });

          const asyncFunc = async () => {
            const currentUser = await User.findById(user.id);

            pubsub.publish(NEW_CHANNEL_MESSAGE, {
              channelId,
              newChannelMessage: {
                _id: message._id,
                text: message.text,
                channelId: message.channelId,
                userId: message.userId,
                createdAt: message.createdAt,
                user: currentUser,
              },
            });
          };
          asyncFunc();

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    ),
  },
};
