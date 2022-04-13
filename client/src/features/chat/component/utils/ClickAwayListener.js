import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ClickAwayListener = ({ children, onClickAway }) => {
  const childrenRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (childrenRef.current && !childrenRef.current.contains(e.target)) {
        onClickAway();
      }
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [onClickAway]);

  return <>{children(childrenRef)}</>;
};

ClickAwayListener.propTypes = {
  children: PropTypes.any,
  onClickAway: PropTypes.func.isRequired,
};

export default ClickAwayListener;
