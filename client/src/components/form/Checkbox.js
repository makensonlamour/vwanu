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
            className={
              "checkbox appearance-none checked:bg-secondary checked:text-base-100 hover:text-base-100 active:text-base-100 border-blue-300 hover:border-blue-300 ml-2 lg:ml-2" +
              className
            }
            value={values[name]}
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange(name)}
            {...otherProps}
          />
          <span className="text-secondary font-semibold ml-2 text-sm lg:text-lg lg:ml-2">{label}</span>
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
