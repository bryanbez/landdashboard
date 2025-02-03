import dbConnect from "../init";
import User from "../models/User";

export const AuthRepository = {
  async getById({ username }) {
    await dbConnect();
    const userID = await User.findOne({ username }).select("_id");
    return userID ? userID._id : null;
  },
  async getByUsername(username) {
    await dbConnect();
    return await User.findOne({ username });
  },
  async getByEmailAddress(emailaddress) {
    await dbConnect();
    return await User.findOne({ emailaddress });
  },
  async create({ emailaddress, username, hashedPassword, walletaddress }) {
    await dbConnect();
    const newUser = await User.create({
      emailaddress,
      username,
      password: hashedPassword,
      walletaddress,
    });

    return await newUser.save();
  },
};
