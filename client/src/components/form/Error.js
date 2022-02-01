import React from "react";
import PropTypes from "prop-types";
function FormError({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <label className="label">
      <span className="label-text-alt text-red-500">{error}</span>
    </label>
  );
}

FormError.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool
};

export default FormError;
