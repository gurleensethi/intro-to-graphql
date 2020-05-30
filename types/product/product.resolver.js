const { Product } = require("./product.model");
const { Types, SchemaTypes } = require("mongoose");

const product = (_, args) => {
  return Product.findById(SchemaTypes.ObjectId(args.id)).lean().exec();
};

const products = () => {
  return Product.find({}).exec();
};

const newProduct = (_, args, ctx) => {
  return Product.create({
    ...args.input,
    createdBy: Types.ObjectId(), //TODO: Get user id from context
  });
};

const updateProduct = (_, args, ctx) => {
  return Product.update(args.id, ...args.input, true);
};

const removeProduct = (_, args, ctx) => {
  return Product.findByIdAndRemove(args.id).lean().exec();
};

module.exports = {
  Query: {
    product,
    products,
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct,
  },
  Product: {},
};
