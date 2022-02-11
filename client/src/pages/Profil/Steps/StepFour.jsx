import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../../routesPath";
import Step from "./Step";
import { deleteStep } from "../../../helpers";

const StepFour = () => {
  const handleStep = () => {
    deleteStep();
  };

  useEffect(() => {
    handleStep();
  }, []);
  return (
    <>
      <div>
        <Step step={4} className="step-primary" />
        <div className="w-1/2 m-auto">
          <h1 className="card-title text-orange-500">Find Friends</h1>
          <Link to={"../../" + routesPath.NEWSFEED}>Finish</Link>
        </div>
      </div>
    </>
  );
};

export default StepFour;
