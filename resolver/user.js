import User from "../models/user";
import bcrypt from "bcrypt";
import _, { isTypedArray, startsWith } from "lodash";
import { tryLogin } from "../auth";

const formatErrors = (err, models) => {
  // _.pick({a : 1, b : 2}, 'a') => {a: 1}
  // this is not working. I need to find other way to handle error
  return err.errors.map((x) => _.pick(x, ["path", "message"]));
};

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
    async login(_, { email, password }, { models, SECRET, SECRET2 }) {
      return tryLogin(email, password, models, SECRET, SECRET2);
    },
    async register(_, { input }) {
      try {
        const newUser = await User.create(input);
        return {
          ok: true,
          user: newUser,
        };
      } catch (err) {
        let errorMsg = err;
        let errors = [];
        if (err.errors) {
          console.log(err);
          if (err.errors.username) {
            errors.push({
              path: "username",
              message: err.errors.username.properties.message,
            });
          }
          if (err.errors.email) {
            if (err.errors.email.properties.message) {
              errors.push({
                path: "email",
                message: err.errors.email.properties.message,
              });
            }
          }
          if (err.errors.password) {
            if (err.errors.password.properties.message) {
              errors.push({
                path: "password",
                message: err.errors.password.properties.message,
              });
            }
          }
        }
        if (`${err}`.startsWith("MongoError: E11000")) {
          errorMsg = "this email already exists";
          errors.push({ path: "email", message: errorMsg });
        }
        return {
          ok: false,
          errors: errors,
        };
      }
    },
  },
};
