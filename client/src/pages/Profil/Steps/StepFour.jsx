import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../../routesPath";
import Step from "./Step";

const StepFour = () => {
  return (
    <>
      <div>
        <Step step={4} className="step-primary" />
        <div className="w-1/2 m-auto">
          <h1 className="card-title text-orange-500">Find Friends</h1>
          <Link className="btn btn-md btn-primary rounded-full text-base-100 mt-6 hover:bg-secondary" to={"../../" + routesPath.NEWSFEED}>
            Finish
          </Link>
        </div>
      </div>
    </>
  );
};

export default StepFour;
