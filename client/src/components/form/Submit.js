import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

function SubmitBtn({ title, onKeyDown, className, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      type="submit"
      className={"btn btn-primary mt-4 normal-case text-base-100 hover:bg-secondary " + className}
      {...otherProps}
      onClick={handleSubmit}
      onKeyDown={onKeyDown ? handleSubmit : null}
    >
      {title}
    </button>
  );
}

SubmitBtn.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onKeyDown: PropTypes.bool,
};

export default SubmitBtn;
