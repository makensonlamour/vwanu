import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

import Error from "./Error";

function UploadAvatar({ name, className, id, icon, format, setAvatarState, ...otherProps }) {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <div className="form-control">
        <input
          type="file"
          accept={format}
          id={id}
          className={"hidden" + className}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => {
            setFieldValue(name, e.currentTarget.files[0]);
            handleChange(name);
            setAvatarState(e.currentTarget.files[0]);
          }}
          encType="multipart/form-data"
          {...otherProps}
        />
        <label htmlFor={id}>
          <div className="absolute bottom-[30%] right-[28%] lg:right-[32%] lg:bottom-[32%] rounded-full bg-gray-300 opacity-75 border p-2">
            {icon}
          </div>
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
  id: PropTypes.any.isRequired,
  format: PropTypes.string,
  setAvatarState: PropTypes.func,
};

export default UploadAvatar;
