import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PodcastDetail from "./components/PodcastDetail";
import AdminPanel from "./components/AdminPanel";
import AddPodcast from "./components/AddPodcast";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element ={<Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup /> } />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/podcasts/:id" element={<PodcastDetail />} />
      </Routes>
      <Routes>
        <Route exact path="/admin" element={<AdminPanel />} />
      </Routes>
      <Routes>
        <Route path="/admin/podcasts/add" component={AddPodcast} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;