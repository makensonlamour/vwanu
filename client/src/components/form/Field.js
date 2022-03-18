import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function FormField({ name, label, className, testId, showPassword, labelFor, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-md text-secondary font-semibold -mb-2 mt-4">{label}</span>
        </label>
        <input
          className={"input " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          type={showPassword && show ? "text" : "password"}
          {...otherProps}
        />
        {showPassword ? (
          <>
            <label
              onClick={() => setShow(!show)}
              className="w-10 rounded px-2 py-1 text-sm hover:text-gray-700 text-gray-600 text-right -mt-9 mr-3 ml-auto"
              htmlFor="toggle"
            >
              {show ? "Hide" : "Show"}
            </label>
          </>
        ) : null}
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  appendText: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  showPassword: PropTypes.bool,
  labelFor: PropTypes.string,
};

export default FormField;
