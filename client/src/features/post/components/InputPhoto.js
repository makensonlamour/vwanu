import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";

const InputPhoto = ({
  label = (
    <Fragment>
      <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
      <p className="text-center text-md font-semibold">{"Add Photos"}</p>
      <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
    </Fragment>
  ),
  fn,
  maxFiles,
  type = "photo",
}) => {
  console.log(type);
  const { fileRejections, getRootProps, getInputProps, open } = useDropzone({
    maxFiles: maxFiles,
    accept:
      type === "photo"
        ? {
            "image/*": [".jpg", ".jpeg", ".png"],
          }
        : {
            "video/*": [".mp4", ".m4v"],
          },
    onDrop: (acceptedFiles) => {
      fn(
        acceptedFiles?.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  if (fileRejections?.length > 0) {
    alert(`You can't upload more than 4 images at once`);
  }

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div onClick={open} className="mx-auto">
        {label}
      </div>
    </div>
  );
};

InputPhoto.propTypes = {
  label: PropTypes.element,
  fn: PropTypes.func,
  maxFiles: PropTypes.number,
  type: PropTypes.string,
};

export default InputPhoto;
