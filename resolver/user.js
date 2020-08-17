import User from "../models/user";
import bcrypt from "bcrypt";

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
    async register(_, { input: { password, ...otherArgs } }) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ ...otherArgs, password: hashedPassword });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
