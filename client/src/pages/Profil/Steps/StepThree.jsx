import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../../routesPath";
import Step from "./Step";

const StepThree = () => {
  return (
    <>
      <div>
        {" "}
        <Step step={3} className="step-primary" />
        <div className="w-1/2 m-auto">
          <h1 className="card-title text-orange-500">Change your profil photo</h1>
          <Link to={"../../" + routesPath.STEP_FOUR}>Skip</Link>
        </div>
      </div>
    </>
  );
};

export default StepThree;
