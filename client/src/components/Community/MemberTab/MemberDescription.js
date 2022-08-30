import React from "react";
import PropTypes from "prop-types";

const MemberDescription = ({ title, description }) => {
  return (
    <>
      <div className="">
        <div className="">
          <p className="text-lg font-semibold py-4">{title ? title : ""}</p>
          <p className="">{description ? description : ""}</p>
        </div>
      </div>
    </>
  );
};

MemberDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MemberDescription;
