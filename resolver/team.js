import Team from "../models/team";

export default {
  Mutation: {
    async createTeam(_, { input }, { user }) {
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
              message: err.errors.username.properties.message,
            });
          }
        }

        return {
          ok: false,
          errors: errors,
        };
      }
    },
  },
};
