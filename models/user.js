import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";
import { isEmail } from "validator";

const UserSchema = new mongoose.Schema({
  //make sequence for userid
  username: { type: String, required: "User name is required" },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    validate: [isEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: [8, "The password needs to be between 8 and 20 long"],
    maxlength: [20, "The password needs to be between 8 and 20 long"],
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

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
