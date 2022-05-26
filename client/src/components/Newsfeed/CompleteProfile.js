import React from "react";
import PropTypes from "prop-types";
import { Stepper, Step, StepLabel } from "@mui/material";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

const CompleteProfile = ({ data, percentage }) => {
  return (
    <>
      <div className="w-[300px] bg-white border border-gray-200 rounded-lg p-2 mb-8">
        <h2 className="my-5 text-xl font-medium">Complete Your Profile</h2>
        <div className="w-44 mx-auto">
          <CircularProgressbarWithChildren
            strokeWidth="4"
            circleRatio="0.5"
            className="text-primary"
            value={percentage}
            styles={buildStyles({
              rotation: 0.75,
              pathColor: `rgba(5, 61, 200, ${percentage / 100})`,
              textColor: "#053dc8",
              trailColor: "#d6d6d6",
            })}
          >
            <div className="text-xl font-medium text-center text-secondary align-middle -mt-10">
              <strong>{`${percentage} `}</strong>
              <span className="text-sm font-normal">{"%"}</span>
              <p className="text-center text-sm font-normal">Complete</p>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="-mt-10 text-sm">
          <Stepper orientation="vertical">
            {data.map((step) => (
              <Step
                active={false}
                completed={step.total % step.complete === 0 && step.total / step.complete === 1 ? true : false}
                key={step.title}
              >
                <StepLabel style={{ display: "flex" }}>
                  <span className="text-left">{step.title}</span>{" "}
                  <span className="text-right">
                    {step.complete}/{step.total}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </>
  );
};

CompleteProfile.propTypes = {
  data: PropTypes.array.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default CompleteProfile;
