import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

mongoose.Promise = global.Promise;

const handleOpen = () => {
  console.log("Connected to DB");
};

const handleError = (error) => {
  console.log(`Error on DB connection${error}`);
};

db.once("open", handleOpen);
db.once("error", handleError);
