import User from "../models/user";

export default {
  Query: {
    async allUser() {
      return await User.find();
    },
    async getUser(root, { _id }) {
      return await User.findById(_id);
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      return await User.create(input);
    },
    async createUser(_, { input }) {
      try {
        await Team.create(input);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
