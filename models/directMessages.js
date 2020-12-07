import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    text : {
        type : mongoose.Schema.Types.String
    }
});

const model = mongoose.model("direct_message", MessageSchema);

export default model;
