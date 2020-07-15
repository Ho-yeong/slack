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
  },
};
