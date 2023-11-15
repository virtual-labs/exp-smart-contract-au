import React, { useState, useEffect } from "react";
import Inputbox from "./Components/Input";
import Start from "./Components/Start";
import Hex from "./Components/Flowchart";
import Static from "./Components/Static";
import "./App.css";
import Animation from "./Components/Animation";
function App() {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [inputBoxVisible, setInputBoxVisible] = useState(false);
  const [showStaticComponent, setShowStaticComponent] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  const components = [Hex];
  const durations = [5000, 10000];
  const reloadTime = 19000;

  const toggleInputBox = () => {
    setInputBoxVisible(true);
  };

  const handleInputSubmit = () => {
    setInputBoxVisible(true);
    setShowStaticComponent(false);

    setTimeout(() => {
      setShowStaticComponent(true);
      setInputBoxVisible(false);
    }, reloadTime);
  };

  const onShowSimulation = () => {
    setShowAnimation(false);
  };
  useEffect(() => {
    if (!showStaticComponent) {
      const componentInterval = setInterval(() => {
        setCurrentComponentIndex((prevIndex) => {
          if (prevIndex < components.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(componentInterval);
            return prevIndex;
          }
        });
      }, durations[currentComponentIndex]);

      return () => {
        clearInterval(componentInterval);
      };
    }
  }, [showStaticComponent, currentComponentIndex, durations]);

  const CurrentComponent = components[currentComponentIndex];

  return (
    <div>
      {showAnimation ? (
        <Animation onShowSimulation={onShowSimulation} />
      ) : (
        <div className="row">
          <div className="col-md-2">
            {inputBoxVisible ? (
              <Inputbox onSubmit={handleInputSubmit} />
            ) : (
              <Start onStartClick={toggleInputBox} />
            )}
          </div>
          <div className="col-md-10">
            {showStaticComponent ? <Static /> : <CurrentComponent />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
