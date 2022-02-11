import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function UploadAvatar({ name, className, id, icon, format, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();
  //const [previewFile, setPreviewFile] = useState("");
  let previewFile = "";

  return (
    <>
      <div className="form-control">
        <input
          type="file"
          accept={format}
          id={id}
          className={"hidden" + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />
        <label htmlFor={id}>
          {previewFile ? (
            <div className="overflow-hidden rounded-full shadow-sm m-auto h-48 w-48">
              <img src={previewFile} className="object-fill" alt="profile_photo" />{" "}
            </div>
          ) : (
            icon
          )}
        </label>
        <Error error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

UploadAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  appendText: PropTypes.string,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.any.required,
  format: PropTypes.string
};

export default UploadAvatar;
