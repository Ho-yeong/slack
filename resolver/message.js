import Message from "../models/messages";

export default {
  Mutation: {
    async createMessage(_, { input }, { user }) {
      try {
        await Message.create({ ...input, username: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
