const { Schema, model } = require("mongoose");

const roles = {
  member: "member",
  admin: "admin",
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      required: true,
      default: roles.member,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (password) {
  return this.password === password;
};

module.exports = {
  roles,
  User: model("user", userSchema),
};
