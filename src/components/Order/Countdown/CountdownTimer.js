import React from "react";
import Countdown from "react-countdown";
import HomeIcon from "@mui/icons-material/Home";

import "./CountdownTimer.css";

const Complete = () => {
  const handleGoBackHome = () => {
    console.log("go back home");

    // temporary fix
    window.location.reload();
    // setOrderOpen(false)
  };

  return (
    <div className="complete-container">
      <div className="complete-description-container">
        You're movie has been delivered. Click here to go back.
      </div>
      <div className="home-icon-container" onClick={handleGoBackHome}>
        <HomeIcon className="home-icon" />
      </div>
    </div>
  );
};

const renderer = ({ minutes, seconds, completed, props }) => {
  if (completed) {
    // Render a complete state
    return <Complete setOrderOpen={props.setOrderOpen} />;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

const CountdownTimer = (props) => {
  console.log(props.setOrderOpen);
  return (
    <Countdown date={Date.now() + 60000} renderer={renderer}>
      <Complete setOrderOpen={props.setOrderOpen} />
    </Countdown>
  );
};

export default CountdownTimer;
