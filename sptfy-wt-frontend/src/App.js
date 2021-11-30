import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Navbar component present throughout app/views
import NavBar from "./Components/Nav/NavBar";

// Views for main pages of app
import Profile from "./Views/Profile/Profile";
import Home from "./Views/Home/Home";
import Browse from "./Views/Browse/Browse";

// Context to store user/profile info
import UserContext from "./Context/UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
          setAccessToken(resObject.user.accessToken);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  async function logout() {
    setUser(null);
    await axios({
      url: "http://localhost:3000/auth/logout",
      method: "get",
    });
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, accessToken }}>
        <NavBar logout={logout} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="profile" element={<Profile user={user} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
