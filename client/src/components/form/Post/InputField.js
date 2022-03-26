import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "../Error";

function InputField({ name, className, testId, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <textarea
        className={"textarea textarea-ghost resize-none cols-4 " + className}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        rows={5}
        cols={40}
        {...otherProps}
      ></textarea>
      <Error testId={testId} error={errors[name]} visible={touched[name]} />
    </>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  testId: PropTypes.string,
};

export default InputField;
