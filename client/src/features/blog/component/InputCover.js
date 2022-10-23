import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { AiOutlineDelete } from "react-icons/ai";
import "react-image-crop/dist/ReactCrop.css";

const InputCover = ({ fn, editData = false }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles?.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
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

  useEffect(() => {
    if (editData) {
      setFiles([{ preview: editData }]);
    } else {
      setFiles([]);
    }
  }, [editData]);

  return (
    <>
      {files?.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <div className="w-full relative">
            <img src={files[0]?.preview} alt="_preview" className="w-full h-52 object-cover rounded-2xl" />
            <button
              onClick={() => setFiles([])}
              className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
            >
              <AiOutlineDelete size={"24px"} className="" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 bg-white rounded-2xl border-2 border-sky-500 border-dotted">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="mx-auto justify-center w-full">
                <p className="text-center text-lg font-normal">{`Drop your image here`}</p>
                <button
                  className="mt-3 flex justify-center px-8 mx-auto py-2 items-center bg-gray-200 text-black hover:text-white hover:bg-secondary rounded-xl border-0"
                  onClick={open}
                >
                  Select your file
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4 py-3 bg-white w-full border border-gray-200 rounded-2xl">
            <p className="text-black text-sm">{`For best results, upload an image that is 700px by 300px or larger.`}</p>
            <p className="text-black text-sm">{`If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab.`}</p>
          </div>
        </>
      )}
    </>
  );
};

InputCover.propTypes = {
  fn: PropTypes.func,
  editData: PropTypes.string,
};

export default InputCover;
