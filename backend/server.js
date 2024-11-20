const express = require("express");
//const mongoose = require("mongoose");
const fs = require("fs"); // File system module to read and write JSON files
const path = require("path"); // To handle file paths
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB (DocumentDB)
//mongoose
//  .connect(process.env.DOCUMENTDB_URI, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  })
//  .then(() => console.log("Connected to DocumentDB"))
//  .catch((error) => console.error("Error connecting to DocumentDB:", error));

// Endpoint to update the user JSON file
app.post("/api/purchase", (req, res) => {
  console.log("Received purchase request:", req.body); // Log the request body
  const { userId, tourId } = req.body;
  const userFilePath = path.join(__dirname, "..", "public", "data", `${userId}.json`);
  console.log("userFilePath:", userFilePath);

  fs.readFile(userFilePath, "utf8", (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({ message: "Error reading user data" });
    }

    let userData;
    try {
      userData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return res.status(500).json({ message: "Error parsing user data" });
    }

    if (!userData.purchased.includes(tourId)) {
      userData.purchased.push(tourId);

      fs.writeFile(userFilePath, JSON.stringify(userData, null, 2), "utf8", (err) => {
        if (err) {
          console.error('Error writing user data:', err);
          return res.status(500).json({ message: "Error saving user data" });
        }
        return;// res.status(200).json({ message: "Tour added to purchased list" });
      });
    } else {
      return;// res.status(400).json({ message: "Tour already in purchased list" });
    }
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
