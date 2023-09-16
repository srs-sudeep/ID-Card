import React, { useState, useEffect } from "react";
import axios from "axios";

const PodcastDetail = (props) => {
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const response = await axios.get(`http://localhost:5000/api/podcasts/${props.match.params.id}`);
      setPodcast(response.data);
    };
    fetchPodcast();
  }, [props.match.params.id]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{podcast.name}</h2>
      <p>{podcast.description}</p>
      <p>Category: {podcast.category}</p>
      <p>Type: {podcast.type}</p>
      <p>Speaker: {podcast.speaker}</p>
      <p>File URL: {podcast.fileUrl}</p>
    </div>
  );
};

export default PodcastDetail;
