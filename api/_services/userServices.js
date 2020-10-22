/* eslint-disable no-useless-catch */
const bcrypt = require("bcryptjs");
const { model: User } = require("../_models/userModel");

exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (e) {
    throw e;
  }
};

exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await User.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
  } catch (e) {
    throw e;
  }
};

exports.verifyOldPassword = async (_id, password) => {
  try {
    const user = await User.find({ _id });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return match;
      }
    }
  } catch (e) {
    throw e;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return user;
    }
  } catch (e) {
    throw e;
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (e) {
    throw e;
  }
};

exports.updateUser = async (_id, role, banned) => {
  try {
    return await User.findByIdAndUpdate({ _id }, { $set: { role, banned } });
  } catch (e) {
    throw e;
  }
};

exports.updatePassword = async (_id, unhash) => {
  try {
    const password = await bcrypt.hash(unhash, 10);
    return await User.findByIdAndUpdate({ _id }, { $set: { password } });
  } catch (e) {
    throw e;
  }
};

exports.updateProfile = async (_id, email, username) => {
  try {
    return await User.findByIdAndUpdate({ _id }, { $set: { email, username } });
  } catch (e) {
    throw e;
  }
};
