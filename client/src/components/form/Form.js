import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
function FormWrapper({ initialValues, onSubmit, validationSchema, children, className, unstyle = false, ...otherProps }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} onKeyDown={onSubmit}>
      {() => (
        <div role="form" className={unstyle ? " " : " lg:px-10 lg:pt-5 lg:pb-5 card " + className} {...otherProps}>
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
  unstyle: PropTypes.bool,
};

export default FormWrapper;
