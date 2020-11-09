import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  admin : {
    type : mongoose.Schema.Types.Boolean,
    required : true
  }
});

const model = mongoose.model("Member", MemberSchema);

export default model;
