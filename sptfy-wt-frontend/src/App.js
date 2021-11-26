import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Map/Map";
import NavBar from "./Nav/NavBar";
import Profile from "./Profile";
import Home from "./Home";
import PlaylistMap from "./PlaylistMap";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="browse" element={<Map />}>
          <Route path="playlist" element={<PlaylistMap />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
