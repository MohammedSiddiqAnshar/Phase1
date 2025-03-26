import React from "react";
import UseToggle from "./UseToggle";

const ToggleComponent = () => {
  const [isVisible, toggle] = UseToggle(false);

  return (
    <div className="toggle-container">
      <button onClick={toggle} className="toggle-button">
        {isVisible ? "Hide" : "Show"} Content
      </button>
      {isVisible && <p className="toggle-content">Finally you found me by clicked the Button!</p>}
    </div>
  );
};

export default ToggleComponent;
