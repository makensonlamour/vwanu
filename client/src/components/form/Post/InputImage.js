import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "../Error";

function InputImage({ label, name, className, id, icon, format, stateFile, ...otherProps }) {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className=" -mt-5">
        <input
          type="file"
          accept={format}
          id={id}
          className={"hidden " + className}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => {
            setFieldValue(name, e.currentTarget.files[0]);
            handleChange(name);
            stateFile(e.currentTarget.files[0]);
          }}
          {...otherProps}
        />
        <label htmlFor={id}>
          <span className="inline text-md">
            {icon} {label ? label : ""}
          </span>
        </label>
        <Error error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

InputImage.propTypes = {
  name: PropTypes.string.isRequired,
  appendText: PropTypes.string,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.any.isRequired,
  format: PropTypes.string,
  stateFile: PropTypes.string,
  label: PropTypes.string,
};

export default InputImage;
