const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.post("save", function (doc) {
  console.log(`👤 New user created: ${doc.email}`);
});

userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

userSchema.methods.getProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
  };
};

userSchema.statics.findByEmailDomain = function (domain) {
  return this.find({ email: new RegExp(`@${domain}$`, "i") });
};

module.exports = mongoose.model("User", userSchema);