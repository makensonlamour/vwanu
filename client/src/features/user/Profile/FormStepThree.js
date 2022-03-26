import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

//RTK query
import { useUpdateProfilePictureMutation } from "../../user/userSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
import { UploadAvatar, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { FaUserCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

const FormStepThree = () => {
  const dataUser = useOutletContext();
  const idUser = dataUser.user.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alerts = useSelector(getAlerts);
  const [updateProfilePicture, { isLoading, data, isSuccess }] = useUpdateProfilePictureMutation();
  const id = uuidv4();
  const [avatar, setAvatar] = useState(null);

  const ValidationSchema = Yup.object().shape({
    profilePicture: Yup.mixed().required().label("Profile Photo"),
  });

  const initialValues = {
    profilePicture: "",
    idUser,
  };

  let formData = new FormData();

  const handleStepThree = async (credentials) => {
    formData.append("profilePicture", avatar);
    const obj = { idUser: credentials.idUser, profilePicture: formData };
    console.log(avatar);
    try {
      await updateProfilePicture(obj).unwrap();
    } catch (e) {
      console.log(e);
      let customMessage = "An unknown network error has occurred on Vwanu. Try again later.";
      if (e.status === 400) {
        dispatch(
          setAlert({
            msg: e.data.errors[0].message,
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), e.data.errors[0].message.length * 200);
      } else {
        dispatch(
          setAlert({
            msg: customMessage,
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), customMessage.length * 200);
      }
    }
  };

  if (isSuccess) {
    navigate("../../" + routesPath.STEP_FOUR, { state: data });
  }

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleStepThree}
        className="mt-4 lg:shadow-2xl lg:rounded-t-3xl md:px-24 lg:px-10"
      >
        <h1 className="card-title text-secondary text-center">Change your profile photo</h1>
        <Alerts className="bg-error" alerts={alerts} />
        {avatar || dataUser?.user?.profilePicture ? (
          <div className="object-fit overflow-hidden rounded-full shadow-sm m-auto h-48 w-48">
            <img src={avatar ? URL.createObjectURL(avatar) : dataUser.user.profilePicture} className="object-fill" alt="profile_photo" />{" "}
          </div>
        ) : (
          <FaUserCircle size="150px" className="m-auto text-gray-500" />
        )}
        <UploadAvatar
          autoCapitalize="none"
          placeholder="Avatar"
          name="profilePicture"
          id="img"
          stateFile={setAvatar}
          accept="image/png,image/jpg,image/jpeg"
          icon={<RiImageAddFill size="24px" className="text-gray-800" />}
          autoComplete="new-file"
          className="bg-blue-200 text-secondary font-semibold rounded-full px-6 input-primary border-none w-1/2 ml-auto hidden"
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
