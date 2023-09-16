import React, { useState, useEffect } from "react";
import axios from "axios";
import PodcastCard from "./PodcastCard";

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const response = await axios.get("http://localhost:5000/api/podcasts");
      setPodcasts(response.data);
    };
    fetchPodcasts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast._id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
