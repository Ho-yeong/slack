import Team from "../models/team";
import Channel from "../models/channel";
import requiresAuth from "../permissions";

export default {
  Query: {
    allTeams: requiresAuth.createResolver(async (_, args, { user }) => {
      return await Team.find({ owner: user.id });
    }),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (_, { name }, { user }) => {
      try {
        await Team.create({ name, owner: user.id });
        return {
          ok: true,
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
    }),
  },
  Team: {
    channels: ({ _id }, args, { user }) => {
      Channel.find({ teamId: _id });
    },
  },
};
