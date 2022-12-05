import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function Checkbox({ name, label, className, testId, link, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="my-3">
        <div className="flex items-start justify-between">
          <div className="flex justify-start">
            {" "}
            <input
              type="checkbox"
              className={
                "outline-none checked:bg-primary cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border-1 border-primary rounded-md hover:border-1 active:border-1 focus:border-1" +
                className
              }
              value={values[name]}
              onBlur={() => setFieldTouched(name)}
              onChange={handleChange(name)}
              {...otherProps}
            />
            <p className="aligns-start ml-2 text-sm lg:text-md">{label}</p>
          </div>
          {<p className="aligns-start ml-2 text-sm lg:text-md">{link}</p>}
        </div>
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
