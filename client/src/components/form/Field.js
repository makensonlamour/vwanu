import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function FormField({ name, label, className, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          //  {...(errors ? (touched[name] ? { className: "input input-error input-bordered" } : {}) : {})}
          className={"input " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />
        <Error error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  appendText: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default FormField;
