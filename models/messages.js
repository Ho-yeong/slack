import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: String,
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
});

const model = mongoose.model("Message", MessageSchema);

export default model;
