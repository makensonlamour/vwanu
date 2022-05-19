import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { RiImageAddFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { updateProfilePicture } from "../../../features/user/userSlice";

//Functions for notification after actions
const uploadProfileSuccess = () =>
  toast.success("profile picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating profile picture!", {
    position: "top-center",
  });

const uploadCoverSuccess = () =>
  toast.success("Cover picture updated successfully!", {
    position: "top-center",
  });

const uploadCoverError = () =>
  toast.error("Sorry. Error on updating Cover picture!", {
    position: "top-center",
  });

const UploadPhotoCrop = ({ fromButton, className, id }) => {
  const [image, setImage] = useState(false);
  const [viewToaster, setViewToaster] = useState(false);

  function reload() {
    window.location.reload();
  }

  const handleUpload = async () => {
    const formData = new FormData();
    if (_.isEqual(fromButton, "profile")) {
      formData.append("profilePicture", image);
      formData.append("UserId", id);
      try {
        const res = await updateProfilePicture({ formData, id });
        if (res?.data) {
          setViewToaster(true);
          uploadProfileSuccess();
        }
      } catch (e) {
        console.log(e);
        setViewToaster(true);
        uploadProfileError();
      } finally {
        setImage(false);
        setViewToaster(false);
        reload();
      }
    } else {
      formData.append("coverPicture", image);
      formData.append("UserId", id);

      try {
        const res = await updateProfilePicture({ formData, id });
        if (res?.data) {
          setViewToaster(true);
          uploadCoverSuccess();
        }
      } catch (e) {
        console.log(e);
        setViewToaster(true);
        uploadCoverError();
      } finally {
        setImage(false);
        setViewToaster(false);
        reload();
      }
    }
  };

  useEffect(() => {
    if (image) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <>
      {viewToaster ? <Toaster /> : null}
      <form className="form-control">
        <input
          type="file"
          accept="image/*"
          id={"upload" + fromButton}
          className={"hidden"}
          onChange={(e) => {
            setImage(e.currentTarget.files[0]);
          }}
          encType="multipart/form-data"
        />
        <label htmlFor={"upload" + fromButton}>
          <div className={"border-2 border-white rounded-[14px] bg-gray-300 opacity-75 p-2 " + className}>
            <RiImageAddFill size="24px" className="text-gray-800" />
          </div>
        </label>
      </form>
    </>
  );
};

UploadPhotoCrop.propTypes = {
  fromButton: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default UploadPhotoCrop;
