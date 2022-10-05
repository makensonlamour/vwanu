import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Cropper from "react-cropper";

function UploadAvatar2({ name, className, id, icon, format, setAvatarState, avatarState, ...otherProps }) {
  console.log("test", avatarState);
  const [previewImg, setPreviewImg] = useState(false);
  const cropperRef = useRef(false);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    console.log("img cropped", cropper.getCroppedCanvas());
    cropper.getCroppedCanvas().toBlob((blob) => {
      //   setPreviewImg(blob);
      console.log("blob", URL.createObjectURL(blob));
    });
  };

  console.log("MY PREVIEW", previewImg);

  return (
    <>
      {avatarState ? (
        <>
          <div className="flex justify-center w-full">
            <Cropper
              src={URL.createObjectURL(avatarState)}
              style={{ height: 312, width: 640 }}
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
              initialAspectRatio={2.05 / 1}
              aspectRatio={2.05 / 1}
              guides={true}
              cropend={onCrop}
              ref={cropperRef}
            />
          </div>
          <button
            onClick={() => {
              const imageElement = cropperRef?.current;
              const cropper = imageElement?.cropper;
              cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 }).toBlob((blob) => {
                setPreviewImg(blob);
              });
              console.log("upload Successfully", previewImg);
            }}
            className="bg-secondary mx-2 p-2 text-white rounded-mg"
          >
            Save
          </button>
          {previewImg && (
            <div className="my-4">
              <img className="bg-auto w-[640px] h-[312px]" alt="_" src={URL.createObjectURL(previewImg)} />
            </div>
          )}
          {/* <Cropper
            src={URL.createObjectURL(avatarState)}
            style={{ height: 170, width: 170 }}
            // Cropper.js options
            viewMode={3}
            dragMode="none"
            autoCrop={true}
            highlight={true}
            autoCropArea={0.8}
            rotatable={false}
            zoomable={false}
            zoomOnTouch={false}
            zoomOnWheel={false}
            cropBoxMovable={true}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
            initialAspectRatio={1 / 1}
            aspectRatio={1 / 1}
            background={false}
            guides={true}
            crop={onCrop}
            ref={cropperRef}
          /> */}
          <label htmlFor={id}>
            <button onClick={() => setAvatarState(false)} className="bg-primary p-2 rounded-xl text-white">
              Change
            </button>
          </label>
        </>
      ) : (
        <div className="form-control">
          <input
            type="file"
            accept={format}
            id={id}
            className={"hidden " + className}
            onChange={(e) => {
              setAvatarState(e.currentTarget.files[0]);
              console.log("test", avatarState);
            }}
            encType="multipart/form-data"
            {...otherProps}
          />
          <label htmlFor={id}>
            <div className="absolute border-2 border-white bottom-[31%] right-[21%] lg:right-[34%] lg:bottom-[25%] rounded-[14px] bg-gray-300 opacity-75 p-2">
              {icon}
            </div>
          </label>
        </div>
      )}
    </>
  );
}

UploadAvatar2.propTypes = {
  name: PropTypes.string.isRequired,
  appendText: PropTypes.string,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.any.isRequired,
  format: PropTypes.string,
  setAvatarState: PropTypes.func,
  avatarState: PropTypes.object,
};

export default UploadAvatar2;
