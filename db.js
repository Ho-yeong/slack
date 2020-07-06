import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user";

dotenv.config();

const dummnyData = [
  {
    userid: 1,
    username: "테스트",
    email: "admin@admin.com",
    password: "admin",
  },
];

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

dummnyData.map((data) => {
  const dummny = new User(data);
  dummny.save();
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
