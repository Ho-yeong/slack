import Channel from "../models/channel";
import Team from "../models/team";
import Member from "../models/member";
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
          const memberPromise = await Member.findOne({teamId, userId : user.id});
          if (!memberPromise.admin) {
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
