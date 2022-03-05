import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function Checkbox({ name, label, className, testId, link, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control mt-3">
        <label className="label">
          <input
            type="checkbox"
            className={"checkbox" + className}
            value={values[name]}
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange(name)}
            {...otherProps}
          />
          <span className="label-text ml-2 text-sm lg:text-lg lg:ml-0">{label}</span>
          <span className="ml-8 text-sm lg:text-lg">{link}</span>
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
  link: PropTypes.string,
};

export default Checkbox;
