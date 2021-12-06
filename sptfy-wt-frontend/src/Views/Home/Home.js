import React from "react";
import "./Home.css";

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
  return <div style={bgImgStyle}></div>;
}

export default Home;
