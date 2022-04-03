import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { TextareaAutosize } from "@mui/material";

import Error from "../Error";

function InputComment({ name, maxRows, onKeyDown, className, testId, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextareaAutosize
        className={" " + className}
        type="text"
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        maxRows={maxRows}
        autoFocus={true}
        onKeyDown={onKeyDown}
        {...otherProps}
      ></TextareaAutosize>
      <Error testId={testId} error={errors[name]} visible={touched[name]} />
    </>
  );
}

InputComment.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  testId: PropTypes.string,
  maxRows: PropTypes.number,
  onKeyDown: PropTypes.func,
};

export default InputComment;
