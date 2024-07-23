/* eslint-disable react/prop-types */
import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="card-text pt-0 w-[100%] font-normal">
      {isReadMore ? text?.slice(0, 300) : text}
      <span onClick={toggleReadMore} className="text-primary cursor-pointer text-sm">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Content = ({ children }) => {
  return <ReadMore>{children}</ReadMore>;
};

export default Content;
