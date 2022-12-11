const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  token: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are hashing the password
//when user changing the password then it will update
userSchema.pre("save", async function (next) {
  console.log("hi from inside");

  if (this.isModified("password")) {
    console.log("i am pre password");
    this.password = await bycrypt.hash(this.password, 12);
    this.cpassword = await bycrypt.hash(this.cpassword, 12);
  }
  next();
});

//genrate token
userSchema.methods.genrateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);
module.exports = User;
