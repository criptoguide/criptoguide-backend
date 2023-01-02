const moongose = require("mongoose");
const { Schema } = moongose;
import bcrypt from "bcrypt";
import { defaults } from "../../config";

const UserSchema = new Schema(
    {
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      picture: { type: String },
      password: { type: String },
      data: {type: Array},
    },
    {
      timestamps: true,
    }


);

UserSchema.pre("save", async function (next) {
  let user = this ;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(defaults.saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword
) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};



const User = moongose.model('User', UserSchema);

module.exports = User;