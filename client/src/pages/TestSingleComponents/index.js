import React from "react";
import PreviewUrl from "./../../components/common/PreviewUrl";

const TestSingleComponent = () => {
  return (
    <>
      <div className="m-10 w-[50%]">
        <PreviewUrl url={"https://www.google.com"} />
      </div>
    </>
  );
};

export default TestSingleComponent;
