import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: "Team name is required" },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
});

const model = mongoose.model("Team", TeamSchema);

export default model;
