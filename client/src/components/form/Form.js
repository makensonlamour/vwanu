import { Formik } from "formik";
function FormWrapper({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <div role="form" className="p-10 card bg-base-200" {...otherProps}>
          {children}
        </div>
      )}
    </Formik>
  );
}

export default FormWrapper;
