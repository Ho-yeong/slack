import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: "Channel name is required" },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  public: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
});

const model = mongoose.model("Channel", ChannelSchema);

export default model;
