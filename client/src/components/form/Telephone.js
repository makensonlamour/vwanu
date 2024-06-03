/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useFormikContext } from "formik";

import Error from "./Error";

function FormTelephone({ name, label, labelButton, className, testId, countryCode, setCountryCode, ...otherProps }) {
  const { values, setFieldTouched, setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control">
        {labelButton ? (
          <div className="flex items-end">
            <label className="label">{label && <span className="label-text text-md font-semibold -mb-2 mt-4 mr-1">{label}</span>}</label>
            {labelButton}
          </div>
        ) : (
          <label className="label">{label && <span className="label-text text-md font-semibold -mb-2 mt-4">{label}</span>}</label>
        )}

        <PhoneInput
          international
          withCountryCallingCode={false}
          countryCallingCodeEditable={false}
          onCountryChange={(e) => setCountryCode(e)}
          defaultCountry={countryCode ? countryCode : ""}
          className={"input first:bg-inherit first:border-none " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name, true)}
          onChange={(value) => setFieldValue(name, value || "")}
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
  labelButton: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  countryCode: PropTypes.string,
  setCountryCode: PropTypes.func,
};

export default FormTelephone;
