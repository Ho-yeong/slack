import UserModel from "./models/user";

class User {
  constructor() {
    this.findUser = (name) => {
      const user = UserModel.find({}, (error, data) => {
        return data;
      });
      return user;
    };
  }
}
export default { User };
