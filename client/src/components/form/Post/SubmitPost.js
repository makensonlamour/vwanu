import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

function SubmitPost({ title, className, disabled = false, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return (
    <button type="submit" className={"" + className} {...otherProps} onClick={handleSubmit} disabled={disabled}>
      {title}
    </button>
  );
}

SubmitPost.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SubmitPost;
