import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  name: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  public: Boolean,
});

const model = mongoose.model("Channel", ChannelSchema);

export default model;
