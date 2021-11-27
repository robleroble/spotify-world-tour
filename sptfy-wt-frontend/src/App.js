import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Map/Map";
import NavBar from "./Nav/NavBar";
import Profile from "./Profile";
import Home from "./Home";
import PlaylistMap from "./PlaylistMap";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject.user);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="browse" element={<Map />}>
            <Route path="playlist" element={<PlaylistMap />} />
          </Route>
          <Route path="profile" element={<Profile user={user} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
