import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <Link to="/admin/podcasts/add">Add Podcast</Link>
    </div>
  );
};

export default AdminPanel;
