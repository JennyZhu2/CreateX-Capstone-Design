const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DOCUMENTDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DocumentDB");
  } catch (error) {
    console.error("Error connecting to DocumentDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
