const { Product } = require("./product.model");
const { Types, SchemaTypes } = require("mongoose");
const { AuthenticationError } = require("apollo-server");

const product = (_, args) => {
  return Product.findById(SchemaTypes.ObjectId(args.id)).lean().exec();
};

const checkAndThrowError = (user, role = undefined) => {
  if (!user || (role && user.role !== role)) {
    throw new AuthenticationError();
  }
};

const products = (_, args, ctx) => {
  checkAndThrowError(ctx.user);
  return Product.find({}).exec();
};

const newProduct = (_, args, ctx) => {
  checkAndThrowError(ctx.user, "admin");
  return Product.create({
    ...args.input,
    createdBy: Types.ObjectId(), //TODO: Get user id from context
  });
};

const updateProduct = (_, args, ctx) => {
  checkAndThrowError(ctx.user, "admin");
  return Product.update(args.id, ...args.input, true);
};

const removeProduct = (_, args, ctx) => {
  checkAndThrowError(ctx.user, "admin");
  return Product.findByIdAndRemove(SchemaTypes.ObjectId(args.id)).lean().exec();
};

const productTypeMap = {
  GAMING_PC: "GamingPc",
  BIKE: "Bike",
  DRONE: "Drone",
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
  Product: {
    __resolveType(product) {
      return productTypeMap[product.type];
    },
  },
};
