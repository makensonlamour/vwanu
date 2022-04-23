import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Select, MenuItem } from "@mui/material";

import Error from "./Error";

function FormSelect({ name, label, options, className, testId, link, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control mt-3">
        <span className="label-text text-md text-secondary font-semibold">{label}</span>
        <Select
          className={"select w-full " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        >
          {options?.map((option) => {
            return !_.isEqual(option?.name, "Not Specified") ? (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.name}
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

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  options: PropTypes.any.isRequired,
};

export default FormSelect;
