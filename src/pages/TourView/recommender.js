const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Tour Schema
const tourSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    coordinates: { lat: Number, lng: Number },
    popularity: Number, // number of users who completed it
    rating: Number, 
    reviews: Number, 
  });

const Tour = mongoose.model("Tour", tourSchema);
app.use(express.json());

// Recommendation Algorithm
app.post("/recommendations", async (req, res) => {
  try {
    const { userId, userLocation, preferences } = req.body;

    // Fetch user's past activity like completed tours
    const userActivity = await getUserActivity(userId);
    const allTours = await Tour.find();

    // Calculate scores for each tour
    const recommendedTours = allTours
      .map((tour) => {
        let score = 0;

        // Match user preferences based on category
        if (preferences.includes(tour.category)) score += 50;

        // Location-based scoring (closer = better)
        if (userLocation) {
          const distance = getDistance(userLocation, tour.coordinates);
          score += Math.max(0, 100 - distance * 2); // Decrease score with distance
        }

        // Add popularity and ratings to the score
        score += tour.popularity * 5;
        score += tour.rating * 10;

        if (userActivity.completedTours.includes(tour._id)) score -= 100; // Penalize if the user already completed the tour
        return { ...tour._doc, score };
      })
      .sort((a, b) => b.score - a.score) // Sort by highest score
      .slice(0, 5); // Limit to top 5 recommendations

    res.json(recommendedTours);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).send("Failed to generate recommendations.");
  }
});

// Function to Fetch User Activity
async function getUserActivity(userId) {
  return {
    completedTours: ["tourId1", "tourId2"], // Example completed tours
    likedCategories: ["history", "adventure"], // Example liked categories
  };
}

// Function to Calculate Distance 
function getDistance(loc1, loc2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(loc2.lat - loc1.lat);
  const dLng = toRadians(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(loc1.lat)) *
      Math.cos(toRadians(loc2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
