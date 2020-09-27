import Message from "../models/messages";
import User from "../models/user";

import requiresAuth from "../permissions";
import message from "../schema/message";

export default {
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
          await Message.create({
            text,
            channelId,
            userId: user.id,
            createdAt: new Date(),
          });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    ),
  },
};
