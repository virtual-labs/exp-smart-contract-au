import React from "react";
import Button from "@mui/joy/Button";
import { Add, KeyboardArrowRight } from "@mui/icons-material";
import './Animation.css'
const Animation = ({ onShowSimulation }) => {
  const videoPath = process.env.PUBLIC_URL + "/images/Smart-contract.mp4";

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "99.98vh",
      }}
    >
      <h1
        style={{
          color: "white",
          paddingTop: 40,
          margin: 0,
          flex: 0.1,
        }}
      >
        Demonstration of Smart Contract
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.9,
        }}
      >
        <video width="1200" height="700" controls className="animation-video">
          <source src={videoPath} type="video/mp4" />
        </video>
        <div style={{ marginTop: "20px", marginLeft: "50%" }}>
          <Button
            endDecorator={<KeyboardArrowRight />}
            color="success"
            style={{ marginTop: "10px" }}
            onClick={onShowSimulation}
          >
            Go to Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Animation;
