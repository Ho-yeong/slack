import Team from "../models/team";
import Channel from "../models/channel";
import User from "../models/user";
import Member from "../models/member";
import db from "mongoose";

import requiresAuth from "../permissions";

export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(async (_, { name }, { user }) => {
      // MongoDB Transaction with Mongoose
      console.log(user);
      const SESSION = await db.startSession();
      await SESSION.startTransaction();
      try {
        const team = await Team.create({ name });
        await Channel.create({
          name: "general",
          public: true,
          teamId: team._id,
        });
        await Member.create({
          teamId : team._id,
          userId : user.id,
          admin : true
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
        if (`${err}`.startsWith("MongoError: E11000")) {
          errorMsg = "this name already exists";
          errors.push({ path: "name", message: errorMsg });
        }
        await SESSION.abortTransaction();
        return {
          ok: false,
          errors: errors,
        };
      } finally {
        SESSION.endSession();
      }
    }),
    addTeamMember: requiresAuth.createResolver(
      async (_, { email, teamId }, { user }) => {
        try {
          const team = await Team.findOne({ _id: teamId });
          if (team.owner != user.id) {
            return {
              ok: false,
              errors: [
                {
                  path: "email",
                  message: "You cannot add members to the team",
                },
              ],
            };
          }
          const userToAdd = await User.findOne({ email });
          if (!userToAdd) {
            return {
              ok: false,
              errors: [
                {
                  path: "email",
                  message: "Could not find user with this email",
                },
              ],
            };
          }
          await Member.create({ teamId, userId: userToAdd._id });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: [{ path: "email", message: "invalid email" }],
          };
        }
      }
    ),
  },
  Team: {
    channels: async ({ _id }, args, { user }) => {
      return await Channel.find({ teamId: _id });
    },
  },
};
