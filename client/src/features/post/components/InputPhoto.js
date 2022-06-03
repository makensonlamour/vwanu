import React from "react";
import PropTypes from "prop-types";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";

const InputPhoto = ({ fn, maxFiles }) => {
  const { fileRejections, getRootProps, getInputProps, open } = useDropzone({
    maxFiles: maxFiles,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
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
        <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
        <p className="text-center text-md font-semibold">{`Add Photos`}</p>
        <p className="text-center text-sm font-light">{`or Drag and drop`}</p>
      </div>
    </div>
  );
};

InputPhoto.propTypes = {
  fn: PropTypes.func,
  maxFiles: PropTypes.number,
};

export default InputPhoto;
