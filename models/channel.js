import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  channelId: { requeird: true, type: Number },
  name: String,
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  public: Boolean,
});

const model = mongoose.model("Channel", ChannelSchema);

export default model;
