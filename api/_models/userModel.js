"user strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favourites: [
    {
      id: {
        type: String,
      },
      nickname: {
        type: String,
      },
      note: {
        type: String,
      },
    },
  ],
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      return next();
    } catch (e) {
      return next(e);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

exports.model = mongoose.model("User", userSchema);
