import React from "react";
import PropTypes from "prop-types";

//Data
import { ItemStep } from "./ItemStep";

const Step = ({ step, className }) => {
  return (
    <>
      <ul className="w-full steps">
        {ItemStep.map((item, index) => {
          return <li key={index} className={`step text-base-100 ${item.step <= step ? className : "text-base-200"}`}></li>;
        })}
      </ul>
    </>
  );
};

Step.propTypes = {
  className: PropTypes.string,
  step: PropTypes.number,
};

export default Step;
