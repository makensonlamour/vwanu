import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { TextareaAutosize } from "@mui/material";

import Error from "./Error";

function TextArea({ name, maxRows, minRows, label, onKeyDown, className, testId, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <label className="label">
        <span className="label-text text-md text-secondary font-semibold -mb-2 mt-4">{label}</span>
      </label>
      <TextareaAutosize
        className={" " + className}
        type="text"
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        maxRows={maxRows}
        minRows={minRows}
        onKeyDown={onKeyDown}
        {...otherProps}
      ></TextareaAutosize>
      <Error testId={testId} error={errors[name]} visible={touched[name]} />
    </>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  onKeyDown: PropTypes.func,
};

export default TextArea;
