module.exports = {
  Query: {
    getData: function (_, args, context, info) {
      throw new Error("This is an error!");
      return null;
    },
  },
  Mutation: {},
  Product: {},
};
