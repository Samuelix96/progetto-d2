import React, { useState } from "react";
import { Container } from "react-bootstrap";




export const DayNightSwitch = ({children}) => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleMode = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  return (
    <Container className="my-2">
    <div className={`home ${isNightMode ? "night-mode" : "day-mode"}`}>
      <button onClick={toggleMode}>
        {isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
      </button>
      <h1>{isNightMode ? "Night Mode" : "Day Mode"}</h1>
      {/* Altri contenuti della tua app */}
    </div>

    </Container>
    
  );
  
};

export default DayNightSwitch;
