import React, { useState } from "react";
import Card from "./Card";
import CardStep from "./CardStep";
import steps from "../steps";
import FinalStep from "./FinalStep";
function App() {
  const [stepNo, setStepNo] = useState(0);
  const nextStep = () => {
    setStepNo((prev) => Math.min(prev + 1, steps.length + 1));
  };

  return (
    <div className="phone-container">
      {stepNo === 0 && <Card onNext={nextStep} />}

      {stepNo >= 1 && stepNo <= 6 && (
        <CardStep
          step={steps[stepNo - 1].step}
          imgURL={steps[stepNo - 1].imgURL}
          time={steps[stepNo - 1].time}
          onNext={nextStep}
        />
      )}

      {stepNo === 7 && <FinalStep />}
    </div>
  );
}

export default App;
