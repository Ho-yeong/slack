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
        const team = await Team.create({ name, owner: user.id });
        await Channel.create({
          name: "general",
          public: true,
          teamId: team._id,
        });
        return {
          ok: true,
          team,
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
    channels: async ({ _id }, args, { user }) => {
      return await Channel.find({ teamId: _id });
    },
  },
};
