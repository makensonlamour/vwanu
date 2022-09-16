import React from "react";
import PropTypes from "prop-types";

const Step = ({ steps, currentStep }) => {
  return (
    <>
      <div className="py-3 w-full">
        <p className="lg:justify-center justify-start flex items-center flex-wrap w-full px-2">
          {steps?.map((step, idx, steps) => {
            return (
              <div key={idx + "_" + step} className={`${currentStep >= idx + 1 ? "text-black" : "text-gray-500"} flex items-center `}>
                <div className="">{idx + 1}</div>
                <div className="mr-1">{"."}</div>
                <div className=""> {step}</div>
                {idx + 1 === steps?.length ? null : (
                  <div className={`${currentStep >= idx + 1 ? "bg-black" : "bg-gray-500"} mx-4 w-[1.5rem] h-[1px]`}></div>
                )}
              </div>
            );
          })}
        </p>
      </div>
    </>
  );
};

Step.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number,
};

export default Step;
