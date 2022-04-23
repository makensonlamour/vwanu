import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useFormikContext } from "formik";

import Error from "./Error";

function FormTelephone({ name, label, className, testId, countryCode, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-md text-secondary font-semibold -mb-2 mt-4">{label}</span>
        </label>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry={countryCode ? countryCode : ""}
          className={"input first:bg-inherit " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormTelephone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default FormTelephone;
