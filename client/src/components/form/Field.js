import { useFormikContext } from "formik";

import Error from "./Error";

function FormField({ name, icon, appendText, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } =
    useFormikContext();

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          className="input"
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />
        <Error error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

export default FormField;
