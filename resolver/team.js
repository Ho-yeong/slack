import Team from "../models/team";
import requiresAuth from "../permissions";

export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(async (_, { input }, { user }) => {
      try {
        await Team.create({ ...input, owner: user.id });
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
};
