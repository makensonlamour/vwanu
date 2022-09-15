import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import _ from "lodash";
// import { MenuItem } from "@mui/material";
// import Select from "react-select";

import Error from "./Error";

function FormSelect({ name, label, options, className, testId, link, fn, ...otherProps }) {
  const { values, setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <div className="form-control mt-3 w-full">
        <span className="label-text text-md text-secondary font-semibold">{label}</span>
        <select
          className={"select w-full " + className}
          value={values[name]}
          onBlur={() => {
            setFieldTouched(name);
          }}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            handleChange(name);
            if (fn) {
              fn(e.target.value);
            }
          }}
          onSelect={(e) => (fn ? fn(e.target.value) : "")}
          {...otherProps}
        >
          <option>{"Not specified"}</option>
          {options?.length > 0 &&
            options?.map((option) => {
              return !_.isEqual(option?.label, "Not Specified") ? (
                <option onClick={() => (fn ? fn(option?.value) : "")} key={option?.id} value={option?.value}>
                  {option?.label}
                </option>
              ) : (
                ""
              );
            })}
        </select>
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  fn: PropTypes.func,
  options: PropTypes.any.isRequired,
};

export default FormSelect;
