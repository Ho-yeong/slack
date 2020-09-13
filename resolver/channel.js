import Channel from "../models/channel";
import user from "../schema/user";
import team from "./team";

import requiresAuth from "../permissions";

export default {
  Query: {
    async allChannel() {
      return await Channel.find();
    },
  },
  Mutation: {
    createChannel: requiresAuth.createResolver(
      async (_, { name, teamId }, { user }) => {
        try {
          const channel = await Channel.create({
            name,
            teamId,
          });
          return {
            ok: true,
            channel,
          };
        } catch (err) {
          let errors = [];
          console.log(err);
          if (err.errors) {
            console.log(err);
            if (err.errors.name) {
              errors.push({
                path: "name",
                message: err.errors.name.properties.message,
              });
            }
          }

          return {
            ok: false,
            errors: errors,
          };
        }
      }
    ),
  },
};
