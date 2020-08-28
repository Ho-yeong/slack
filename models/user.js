import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { isEmail } from "validator";

const UserSchema = new mongoose.Schema({
  //make sequence for userid
  username: { type: String, required: "User name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [isEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: 8,
    unique: true,
  },
  channel_member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatarUrl: String,
  githubId: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
