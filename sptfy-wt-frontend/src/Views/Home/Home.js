import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const bgImgStyle = {
  top: "0",
  left: "0",
  backgroundImage: 'url("/images/concertSmall.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100vw",
  height: "calc(100vh - 60px)",
};

function Home() {
  const navigate = useNavigate();
  const spotifyLogin = () => {
    // NOTE: use env variables
    if (window.location.href.includes("localhost")) {
      window.open("http://localhost:3000/auth/spotify", "_self");
    } else {
      window.open(
        "https://spotify-world-tour.herokuapp.com/auth/spotify",
        "_self"
      );
    }
  };

  return (
    <div className="home-view" style={bgImgStyle}>
      <div className="home-container">
        <h1 className="home-title">Spotify World Tour</h1>
        {/* <h6 className="home-description">
          Explore music from around the world! Continue by logging on to your
          spotify account or browse music anonymously.
        </h6> */}
        <div className="home-btns">
          <button onClick={spotifyLogin} className="home-button">
            Continue with Spotify
          </button>
          <button
            onClick={() => {
              navigate("/browse");
            }}
            className="home-button"
          >
            Continue anonymously
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
