import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactCrop from "react-image-crop";
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

const FormUploadPhoto = ({ user }) => {
  function reload() {
    window.location.reload();
  }
  const [files, setFiles] = useState([]);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 15,
    width: 50,
    height: 65,
    aspect: 1,
  });
  //save the image that used to be crop
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

      //   const base64Image = canvas.toDataURL("image/jpeg", 1);

      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        setPreviewImg(url);
        setResult(blob);
      }, "image/jpeg");

      //   console.log(canvas);

      //   setResult(base64Image);
    } catch (e) {
      console.log("crop the image");
    }
  };

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
    },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const handleSubmit = async () => {
    getCroppedImg();
    const formData = new FormData();
    formData.append("profilePicture", result);
    formData.append("UserId", user?.id);
    try {
      const res = await updateProfilePicture({ formData, id: user?.id });
      if (res?.data) {
        uploadProfileSuccess();
        reload();
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    } finally {
      setImage(false);
    }
  };

  const preview = (
    <>
      {files?.map((file) => {
        return (
          <div key={file?.path} className="">
            <ReactCrop
              crop={crop}
              onChange={(c) => {
                getCroppedImg();
                setCrop(c);
              }}
            >
              <img
                alt={user?.firstName}
                src={file?.preview}
                className="h-72 w-96 object-cover"
                // Revoke data uri after image is loaded
                onLoad={(e) => {
                  setImage(e.target);
                  getCroppedImg();
                }}
              />
            </ReactCrop>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <Toaster />
      {files?.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <div>{preview}</div>
          <div className="block mx-auto">
            {files?.map((file) => {
              return (
                <div key={file?.path} className="mt-6 md:mt-0">
                  <div className="h-36 w-36">
                    <img
                      alt={user?.firstName}
                      src={previewImg}
                      className="h-36 w-36 mask mask-squircle object-cover"
                      // Revoke data uri after image is loaded
                      onLoad={() => {
                        URL.revokeObjectURL(result);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="mt-2 flex flex-col justify-center">
              <button
                onClick={handleSubmit}
                className="block mt-4 bg-primary px-5 py-2 border-0 text-base-100 hover:bg-secondary rounded-xl"
              >
                Save
              </button>
              <button onClick={() => setFiles([])} className="block my-2 hover:text-primary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 bg-placeholder-color rounded-2xl border-2 border-sky-500 border-dotted">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="mx-auto justify-center w-full">
                <p className="text-center text-lg font-normal">{`Drop your image here`}</p>
                <button
                  className="mt-3 flex justify-center px-8 mx-auto py-2 items-center bg-primary text-base-100 hover:bg-secondary rounded-xl border-0"
                  onClick={open}
                >
                  Select your file
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4 py-3 bg-warning w-full border border-yellow-300 rounded-2xl">
            <p className="text-v-yellow-dark text-sm">{`For best results, upload an image that is 300px by 300px or larger.`}</p>
            <p className="text-v-yellow-dark text-sm">{`If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab.`}</p>
          </div>
        </>
      )}
    </>
  );
};

FormUploadPhoto.propTypes = {
  user: PropTypes.object,
};

export default FormUploadPhoto;
