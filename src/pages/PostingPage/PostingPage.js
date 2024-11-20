import React, { useState } from "react";
import Footer from "../../assets/Footer";
import "./PostingPage.css";

const PostingPage = () => {
  const [formData, setFormData] = useState({
    huntId: "",
    title: "",
    shortDescription: "",
    image: null,
    fullDescription: "",
    coordinates: { lat: "", lng: "" },
    missions: [
      {
        step: 1,
        title: "",
        shortDescription: "",
        hint: "",
        history: "",
        coordinates: { lat: "", lng: "" },
      },
    ],
  });

  const [expandedMissions, setExpandedMissions] = useState([true]); // Tracks which missions are expanded

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoordinatesChange = (field, value) => {
    setFormData({
      ...formData,
      coordinates: { ...formData.coordinates, [field]: value },
    });
  };

  const handleMissionChange = (index, field, value) => {
    const updatedMissions = [...formData.missions];
    updatedMissions[index][field] = value;
    setFormData({ ...formData, missions: updatedMissions });
  };

  const addMission = () => {
    setFormData({
      ...formData,
      missions: [
        ...formData.missions,
        {
          step: formData.missions.length + 1,
          title: "",
          shortDescription: "",
          hint: "",
          history: "",
          coordinates: { lat: "", lng: "" },
        },
      ],
    });
    setExpandedMissions([...expandedMissions, true]); // Default to expanded for the new mission
  };

  const toggleMissionVisibility = (index) => {
    const updatedVisibility = [...expandedMissions];
    updatedVisibility[index] = !updatedVisibility[index];
    setExpandedMissions(updatedVisibility);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file.name }); // Simulating an uploaded file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      ...formData,
      missions: formData.missions.map((mission, index) => ({
        ...mission,
        step: index + 1,
      })),
    };
    console.log("Generated JSON Data:", jsonData);
    alert("Scavenger Hunt Submitted Successfully!");
  };

  return (
    <>
      <div className="posting-container">
        <h2>Create a Scavenger Hunt</h2>
        <form onSubmit={handleSubmit} className="posting-form">
          <div className="form-section">
            <h3>General Information</h3>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a catchy title"
                required
              />
            </label>

            <label>
              Short Description:
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Provide a brief overview of the hunt"
                required
              />
            </label>

            <label>
              Upload Image:
              <input type="file" onChange={handleFileUpload} accept="image/*" />
            </label>

            <label>
              Full Description:
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Provide detailed instructions or information"
                required
              />
            </label>

            <label>
              Starting Coordinates:
              <div className="coordinates-group">
                <input
                  type="number"
                  placeholder="Latitude"
                  value={formData.coordinates.lat}
                  onChange={(e) =>
                    handleCoordinatesChange("lat", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  value={formData.coordinates.lng}
                  onChange={(e) =>
                    handleCoordinatesChange("lng", e.target.value)
                  }
                  required
                />
              </div>
            </label>
          </div>

          <div className="form-section">
            <h3>Missions</h3>
            {formData.missions.map((mission, index) => (
              <div key={index} className="mission-card">
                <div className="mission-header">
                  <h4>
                    Step {mission.step}: {mission.title || "Untitled Mission"}
                  </h4>
                  <button
                    type="button"
                    className="toggle-button"
                    onClick={() => toggleMissionVisibility(index)}
                  >
                    {expandedMissions[index] ? "Minimize" : "Expand"}
                  </button>
                </div>
                {expandedMissions[index] && (
                  <div className="mission-content">
                    <label>
                      Title:
                      <input
                        type="text"
                        value={mission.title}
                        onChange={(e) =>
                          handleMissionChange(index, "title", e.target.value)
                        }
                        placeholder="Enter mission title"
                        required
                      />
                    </label>

                    <label>
                      Description:
                      <textarea
                        value={mission.shortDescription}
                        onChange={(e) =>
                          handleMissionChange(
                            index,
                            "shortDescription",
                            e.target.value
                          )
                        }
                        placeholder="Enter mission description"
                        required
                      />
                    </label>

                    <label>
                      Hint:
                      <textarea
                        value={mission.hint}
                        onChange={(e) =>
                          handleMissionChange(index, "hint", e.target.value)
                        }
                        placeholder="Optional hint for participants"
                      />
                    </label>

                    <label>
                      History:
                      <textarea
                        value={mission.history}
                        onChange={(e) =>
                          handleMissionChange(index, "history", e.target.value)
                        }
                        placeholder="Provide historical details or background for this mission"
                        required
                      />
                    </label>

                    <label>
                      Coordinates:
                      <div className="coordinates-group">
                        <input
                          type="number"
                          placeholder="Latitude"
                          value={mission.coordinates.lat}
                          onChange={(e) =>
                            handleMissionChange(index, "coordinates", {
                              lat: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="number"
                          placeholder="Longitude"
                          value={mission.coordinates.lng}
                          onChange={(e) =>
                            handleMissionChange(index, "coordinates", {
                              lng: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </label>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-mission-button"
              onClick={addMission}
            >
              Add Mission
            </button>
          </div>

          <button type="submit" className="submit-button">
            Submit Scavenger Hunt
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostingPage;
