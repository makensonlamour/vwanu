import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import _ from "lodash";

import Error from "./Error";

function Select({ name, label, options, className, testId, link, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control mt-3">
        <span className="label-text text-md text-secondary font-semibold">{label}</span>
        <select
          className={"select w-full " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        >
          <option>{options[0].name}</option>
          {options.map((option) => {
            return !_.isEqual(option.name, "Not Specified") ? (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ) : (
              ""
            );
          })}
        </select>
        {/*}
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
          {*/}
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  options: PropTypes.any.isRequired,
};

export default Select;
