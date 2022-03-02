import React from "react";
import PropTypes from "prop-types";
function FormError({ error, visible, testId }) {
  if (!visible || !error) return null;
  return (
    <label className="label">
      <span data-testid={testId} className="label-text-alt text-red-500">
        {error}
      </span>
    </label>
  );
}

FormError.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool,
  testId: PropTypes.string,
};

export default FormError;
