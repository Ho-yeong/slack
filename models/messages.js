import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  text: String,
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Messages", MessagesSchema);

export default model;
