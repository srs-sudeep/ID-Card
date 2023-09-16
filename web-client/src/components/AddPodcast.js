import React, { useState } from "react";
import axios from "axios";

const AddPodcast = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/podcasts", {
        name,
        description,
        category,
        type,
        speaker,
        fileUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Podcast</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Type" onChange={(e) => setType(e.target.value)} />
        <input type="text" placeholder="Speaker" onChange={(e) => setSpeaker(e.target.value)} />
        <input type="text" placeholder="File URL" onChange={(e) => setFileUrl(e.target.value)} />
        <button type="submit">Add Podcast</button>
      </form>
    </div>
  );
};

export default AddPodcast;
