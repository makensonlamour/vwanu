import React, { useState } from "react";
import * as Yup from "yup";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { updateProfilePicture } from "../../user/userSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import useAuthContext from "../../../hooks/useAuthContext";

// Core components
import { UploadAvatar, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { FaUserCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

const FormStepThree = () => {
  const user = useOutletContext();
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

  let formData = new FormData();

  const handleStepThree = async () => {
    setIsLoading(true);
    formData.append("profilePicture", avatar);
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
        className="mt-4 lg:shadow-2xl lg:rounded-t-3xl md:px-24 lg:px-10"
      >
        <h1 className="card-title text-secondary text-center">Change your profile photo</h1>
        <Alert />
        {avatar || user?.profilePicture ? (
          <div className="object-contain object-center overflow-hidden mask mask-squircle shadow-sm m-auto h-48 w-48 items-center">
            <img src={avatar ? URL.createObjectURL(avatar) : user.profilePicture} className="object-fill" alt="profile_photo" />{" "}
          </div>
        ) : (
          <FaUserCircle size="150px" className="m-auto text-gray-500" />
        )}
        <UploadAvatar
          autoCapitalize="none"
          placeholder="Avatar"
          name="profilePicture"
          id="img"
          setAvatarState={setAvatar}
          accept="image/png,image/jpg,image/jpeg"
          icon={<RiImageAddFill size="24px" className="text-gray-800" />}
          autoComplete="new-file"
          className="bg-blue-200 text-secondary font-semibold mask mask-squircle px-6 input-primary border-none w-1/2 ml-auto hidden"
        />
        <div className="ml-auto px-2 mt-2">
          <Link className="link link-secondary pr-2" to={"../../" + routesPath.STEP_FOUR}>
            Skip
          </Link>
          <Submit className="rounded-full text-base-100 text-md w-3/5 ml-auto" title={isLoading ? <Loader /> : "Next"} />{" "}
        </div>
      </Form>
    </>
  );
};

export default FormStepThree;
