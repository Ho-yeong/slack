import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teamId: { requeird: true, type: Number },
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Team", TeamSchema);

export default model;
