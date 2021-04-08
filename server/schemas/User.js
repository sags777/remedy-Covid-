const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "/profileUploads/defaultProfile.png",
      required: false,
    },
    address:{
      type: String,
      default: null,
      required: false,
    },
    state:{
      type: String,
      default: null,
      required: false
    },
    zip:{
      type: String,
      default: null,
      required: false
    }
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
