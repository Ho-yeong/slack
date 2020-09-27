import Channel from "../models/channel";
import Team from "../models/team";

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
          const team = await Team.findOne({ _id: teamId });
          if (team.owner != user.id) {
            return {
              ok: false,
              errors: [
                {
                  path: "name",
                  message:
                    "You have to be the owner of this team to create channels",
                },
              ],
            };
          }
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
