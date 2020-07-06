import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  //make sequence for userid
  userid: { requeird: true, type: Number },
  username: String,
  email: String,
  password: String,
  avatarUrl: String,
  githubId: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
