import React from "react";
import PropTypes from "prop-types";
import ViewModalLike from "./ViewModalLike";
import ViewDrawerLike from "./ViewDrawerLike";

const ViewLikeButton = ({ postId, amountOfReactions, label }) => {
  return (
    <>
      <div className="hidden lg:inline">
        <ViewModalLike amountOfReactions={amountOfReactions} postId={postId} label={label} />
      </div>
      <div className="lg:hidden">
        <ViewDrawerLike amountOfReactions={amountOfReactions} postId={postId} label={label} />
      </div>
    </>
  );
};

ViewLikeButton.propTypes = {
  label: PropTypes.any,
  postId: PropTypes.string.isRequired,
  amountOfReactions: PropTypes.number,
};

export default ViewLikeButton;
