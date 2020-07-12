import User from "../models/user";

const resolvers = {
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

export default resolvers;
