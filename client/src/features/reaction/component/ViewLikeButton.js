import React from "react";
import PropTypes from "prop-types";
import ViewModalLike from "./ViewModalLike";
import ViewDrawerLike from "./ViewDrawerLike";

const ViewLikeButton = ({ reactions, label }) => {
  return (
    <>
      <div className="hidden lg:inline">
        <ViewModalLike reactions={reactions} label={label} />
      </div>
      <div className="lg:hidden">
        <ViewDrawerLike reactions={reactions} label={label} />
      </div>
    </>
  );
};

ViewLikeButton.propTypes = {
  reactions: PropTypes.array,
  label: PropTypes.any,
};

export default ViewLikeButton;
