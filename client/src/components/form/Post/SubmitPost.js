import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

function SubmitPost({ title, className, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button type="submit" className={"" + className} {...otherProps} onClick={handleSubmit}>
      {title}
    </button>
  );
}

SubmitPost.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SubmitPost;
