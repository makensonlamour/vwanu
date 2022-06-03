import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
function FormWrapper({ initialValues, onSubmit, validationSchema, children, className, ...otherProps }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} onKeyDown={onSubmit}>
      {() => (
        <div role="form" className={"px-2 lg:px-10 pt-5 pb-10 card " + className} {...otherProps}>
          {children}
        </div>
      )}
    </Formik>
  );
}

FormWrapper.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default FormWrapper;
