import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Team", TeamSchema);

export default model;
