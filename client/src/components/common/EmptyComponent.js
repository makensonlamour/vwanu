import React from "react";
import PropTypes from "prop-types";

const EmptyComponent = ({ icon, placeholder, tips, border = true }) => {
  return (
    <>
      <div className={`bg-white  ${border ? " border border-gray-200 rounded-xl" : ""} p-4 w-full`}>
        <div className="w-full flex justify-center py-2">
          <p className="text-lg text-center">{icon || ""}</p>
        </div>
        <div className="w-full py-2">
          <p className="text-lg text-center">{placeholder || ""}</p>
        </div>
        <div className="w-full py-2">
          <p className="text-xs text-center">{tips || ""}</p>
        </div>
      </div>
    </>
  );
};

EmptyComponent.propTypes = {
  icon: PropTypes.any,
  placeholder: PropTypes.string,
  tips: PropTypes.string,
  border: PropTypes.bool,
};

export default EmptyComponent;
