import React, { useState, useRef } from "react";
import * as Yup from "yup";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { updateProfilePicture } from "../../user/userSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import useAuthContext from "../../../hooks/useAuthContext";
import Cropper from "react-cropper";

// Core components
import { UploadAvatar, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { FaUserCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

const FormStepThree = () => {
  const user = useOutletContext();
  const cropperRef = useRef(false);
  const { dispatch, Types } = useAuthContext();
  const idUser = user?.id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [avatar, setAvatar] = useState(null);

  const ValidationSchema = Yup.object().shape({
    profilePicture: Yup.mixed().required().label("Profile Photo"),
  });

  const initialValues = {
    profilePicture: "",
    id: idUser,
  };
  let preview = false;
  const onCrop = async () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    await cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 }).toBlob((blob) => {
      preview = blob;
      // setPreviewImg(blob);
    });
  };

  let formData = new FormData();

  const handleStepThree = async () => {
    setIsLoading(true);
    formData.append("profilePicture", preview);
    formData.append("idUser", idUser);
    try {
      const res = await updateProfilePicture({ formData, id: idUser });
      dispatch({ type: Types.USER_UPDATED, payload: res?.data });
      navigate("../../" + routesPath.STEP_FOUR);
    } catch (e) {
      let customMessage = "An unknown network error has occurred on Vwanu. Try again later.";
      if (e?.response?.status === 400) {
        alertService.error(e?.response?.data?.errors[0]?.message, { autoClose: true });
      } else if (e?.response?.status === 401) {
        customMessage = "Your session has expired. Please login again.";
        alertService.error(customMessage, { autoClose: true });
      } else {
        alertService.error(customMessage, { autoClose: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleStepThree}
        className="mt-4 py-5 lg:shadow-2xl lg:rounded-t-3xl lg:px-10 bg-white"
      >
        <div className="flex justify-center">
          <h1 className="card-title text-center pb-5">Change your profile photo</h1>
        </div>

        <Alert />
        {avatar ? (
          <div className="flex justify-center w-full">
            <Cropper
              src={URL.createObjectURL(avatar)}
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
        ) : (
          <div className="bg-gray-100 border w-[170px] h-[170px] border-gray-200 object-contain object-center overflow-visible mask mask-squircle shadow-sm m-auto flex items-center">
            <FaUserCircle size="100px" className="m-auto text-gray-500" />
          </div>
        )}
        <UploadAvatar
          autoCapitalize="none"
          placeholder="Avatar"
          name="profilePicture"
          id="img"
          setAvatarState={setAvatar}
          avatarState={avatar}
          accept="image/png,image/jpg,image/jpeg"
          icon={<RiImageAddFill size="20px" className="text-gray-800" />}
          autoComplete="new-file"
          className="bg-blue-200 text-secondary font-semibold mask mask-squircle px-6 input-primary border-none w-1/2 ml-auto hidden"
        />
        <div className="flex justify-end items-center px-2 mt-2">
          <Link className="font-semibold" to={"../../" + routesPath.STEP_FOUR}>
            Skip
          </Link>
          <Submit className="rounded-xl text-base-100 text-md py-1 w-fit px-6 ml-auto" title={isLoading ? <Loader /> : "Next"} />{" "}
        </div>
      </Form>
    </>
  );
};

export default FormStepThree;
