import React from "react";
import { Link } from "react-router-dom";

const PodcastCard = ({ podcast }) => {
  return (
    <div>
      <h3>{podcast.name}</h3>
      <p>{podcast.description}</p>
      <Link to={`/podcasts/${podcast._id}`}>View Details</Link>
    </div>
  );
};

export default PodcastCard;
