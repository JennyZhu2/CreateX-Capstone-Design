// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB (DocumentDB)
mongoose
  .connect(process.env.DOCUMENTDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DocumentDB"))
  .catch((error) => console.error("Error connecting to DocumentDB:", error));

// Routes and models would go here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
