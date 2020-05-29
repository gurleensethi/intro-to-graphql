const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
      minlength: 6,
      maxlength: 6,
    },
    discount: {
      type: Number,
      max: 99,
      min: 1,
      required: true,
    },
    expiresOn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Coupon: model("coupon", couponSchema),
};
