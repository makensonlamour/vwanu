import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Cropper from "react-cropper";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import toast, { Toaster } from "react-hot-toast";
import { updateProfilePicture } from "../../../../features/user/userSlice";

//Functions for notification after actions
const uploadProfileSuccess = () =>
  toast.success("profile picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating profile picture!", {
    position: "top-center",
  });

const FormUploadPhoto = ({ user, hideViewer, getImg }) => {
  const cropperRef = useRef(false);
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
      getImg(
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

  let preview = false;

  const onCrop = async () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    await cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 }).toBlob((blob) => {
      preview = blob;
      // setPreviewImg(blob);
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("profilePicture", preview);
    formData.append("UserId", user?.id);
    try {
      const res = await updateProfilePicture({ formData, id: user?.id });
      if (res?.data) {
        uploadProfileSuccess();
        window.location.href = "../../profile/" + user?.id;
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    }
  };

  return (
    <>
      <Toaster />
      {hideViewer && files?.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFiles([]);
              getImg([]);
            }}
            className="block my-2 px-8 rounded-lg py-2 bg-red-500 hover:bg-red-700 text-white"
          >
            Cancel
          </button>
        </div>
      )}
      {files?.length > 0 ? (
        hideViewer ? null : (
          <div className="">
            <div className="flex justify-center w-full">
              <Cropper
                src={URL.createObjectURL(files[0])}
                style={{ height: 170, width: 170 }}
                // Cropper.js options
                viewMode={0}
                dragMode="none"
                autoCrop={true}
                highlight={true}
                autoCropArea={0.8}
                rotatable={false}
                zoomable={false}
                background={false}
                zoomOnTouch={false}
                zoomOnWheel={false}
                cropBoxMovable={true}
                cropBoxResizable={false}
                toggleDragModeOnDblclick={false}
                initialAspectRatio={1 / 1}
                aspectRatio={1 / 1}
                guides={true}
                cropend={onCrop}
                ref={cropperRef}
              />
            </div>

            <div className="mt-2 mx-4 flex flex-row justify-between items-center">
              <button onClick={() => setFiles([])} className="my-2 hover:text-primary font-semibold">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-fit mt-4 bg-primary px-6 py-1 border-0 text-base-100 hover:bg-secondary rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )
      ) : (
        <>
          <div className="p-6 rounded-xl border-2 border-sky-500 border-dotted">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="mx-auto justify-center w-full">
                <p className="text-center text-lg font-normal">{`Drop your image here`}</p>
                <button
                  className="mt-3 flex justify-center px-8 mx-auto py-2 items-center border-placeholder-color bg-gray-100 text-black hover:bg-primary hover:text0white rounded-xl border-0"
                  onClick={open}
                >
                  Select your file
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4 py-3 bg-white w-full border border-placeholder-color rounded-2xl">
            <p className="text-black text-sm">{`For best results, upload an image that is 300px by 300px or larger.`}</p>
            <p className="text-black text-sm">{`If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab.`}</p>
          </div>
        </>
      )}
    </>
  );
};

FormUploadPhoto.propTypes = {
  user: PropTypes.object,
  hideViewer: PropTypes.bool,
  getImg: PropTypes.func,
};

export default FormUploadPhoto;
