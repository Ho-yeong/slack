import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  text: String,
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Messages", MessagesSchema);

export default model;
