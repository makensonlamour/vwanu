import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Select, MenuItem } from "@mui/material";

import Error from "./Error";

function FormSelectMulti({ name, label, options, className, testId, link, isMulti, fn, val, ...otherProps }) {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control mt-3">
        <span className="label-text text-md text-secondary font-semibold">{label}</span>
        <Select
          className={"select w-full " + className}
          value={val}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            handleChange(name);
            fn(e);
          }}
          {...otherProps}
        >
          {options?.map((option) => {
            return !_.isEqual(option?.label, "Not Specified") ? (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ) : (
              ""
            );
          })}
        </Select>
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormSelectMulti.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  options: PropTypes.any.isRequired,
  isMulti: PropTypes.bool,
  fn: PropTypes.func,
  val: PropTypes.array,
};

export default FormSelectMulti;
