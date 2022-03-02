import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function Checkbox({ name, label, className, testId, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control mt-3">
        <label className="cursor-pointer label">
          <input
            type="checkbox"
            className={"checkbox" + className}
            value={values[name]}
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange(name)}
            {...otherProps}
          />
          <span className="label-text">{label}</span>
        </label>
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
};

export default Checkbox;
