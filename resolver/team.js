import Team from "../models/team";

export default {
  Mutation: {
    async createTeam(_, { input }) {
      try {
        await Team.create(input);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
