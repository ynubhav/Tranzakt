const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STR);
    console.log("connect to database");
  } catch (err) {
    console.log("could not establish a connection");
  }
};

connectdb();

const transactionschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  firstname: String,
  credit: Boolean,
  amount: Number,
  time: { type: Date },
});

const Userschema = new mongoose.Schema({
  username: { type: String, unique: true },
  firstname: String,
  lastname: String,
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const accountschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: Number,
  transctions: [transactionschema],
});

const Accounts = mongoose.model("Accounts", accountschema);
const User = mongoose.model("User", Userschema);

module.exports = {
  User,
  Accounts,
};

// for every user   User:friends array={userid}, Account:tranzaktions array=[{credit/debit , userid , time/date, amount }],
