import Team from "../models/team";

export default {
  Mutation: {
    async createTeam(_, { input }, { user }) {
      try {
        await Team.create({ ...input, owner: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
