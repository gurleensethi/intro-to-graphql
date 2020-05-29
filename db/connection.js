const mongoose = require("mongoose");

module.exports = {
  connectDB: async function () {
    await mongoose.connect("mongodb://localhost:27017/intro-graphql", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db...");
  },
};
