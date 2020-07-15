import Channel from "../models/channel";
import user from "../schema/user";
import team from "./team";

export default {
  Query: {
    async allChannel() {
      return await Channel.find();
    },
  },
  Mutation: {
    async createChannel(_, args, { input }) {
      try {
        await Channel.create({ ...args });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
