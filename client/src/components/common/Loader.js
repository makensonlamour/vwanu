import React from "react";
import PropTypes from "prop-types";
import { HollowDotsSpinner } from "react-epic-spinners";

const Loader = ({ color }) => {
  return <HollowDotsSpinner color={color ? color : "#fff"} />;
};

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
