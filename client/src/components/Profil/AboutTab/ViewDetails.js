import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import routesPath from "../../../routesPath";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateUser } from "../../../features/user/userSlice";
import { GrView } from "react-icons/gr";
import { BiHide } from "react-icons/bi";
import { useSendEmailVerification } from "../../../features/auth/authSlice";

//Functions for notification after actions
const sendEmailSuccess = () =>
  toast.success("Email Verification resent successfully!", {
    position: "top-center",
  });

const sendEmailError = () =>
  toast.error("Sorry. Error on sending Email Verification!", {
    position: "top-center",
  });

const ViewDetails = ({ title, user, substabs }) => {
  const userMe = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const sendEmail = useSendEmailVerification(["email", "send"], undefined, undefined);

  const handleUpdate = async (isHide, hideName) => {
    try {
      const dataObj = { id: userMe?.id };
      dataObj[hideName] = isHide;

      await updateUser.mutateAsync(dataObj);

      window.location.href = "../../profile/" + userMe?.id + "/about";
    } catch (e) {
      console.log(e);
    }
  };

  const resendEmail = async () => {
    try {
      const dataObj = { action: "resendVerifySignup", value: { email: userMe?.email } };
      console.log("test", dataObj);
      await sendEmail.mutateAsync(dataObj);
      sendEmailSuccess();
    } catch (e) {
      console.log(e);
      sendEmailError();
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
        <div className="border-b flex justify-between items-center pb-4">
          <p className="font-bold text-lg text-primary">{title}</p>

          {userMe?.id?.toString() === id?.toString() && (
            <button
              onClick={() => {
                setEdit(true);
                navigate("../.." + routesPath.PROFILE_EDIT + "?tabs=edit&subtabs=" + substabs, { state: { edit } });
              }}
              className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-2 px-6 font-semibold"
            >
              Edit
            </button>
          )}
        </div>
        {user?.map((detail) => {
          return (
            <>
              {detail?.value && (detail?.view || userMe?.id?.toString() === id?.toString()) && (
                <div key={detail?.name} className="flex gap-x-2 py-3">
                  <p className="basis-1/3 text-gray-500">{detail?.name}</p>
                  {detail?.name === "Interest" ? (
                    detail?.value?.length > 0 ? (
                      <div className="flex flex-wrap justify-start gap-2">
                        {detail?.value?.map((interest) => {
                          return (
                            <p key={interest?.id} className="capitalize bg-gray-100 px-2 text-xs rounded-full">
                              {interest?.name}
                            </p>
                          );
                        })}
                      </div>
                    ) : null
                  ) : (
                    <div className="flex basis-2/3">
                      {userMe?.id?.toString() === id?.toString() && detail?.name === "Email" ? (
                        <div className="flex basis-2/3">
                          <p className="pr-2">{detail?.value}</p>
                          {userMe?.verified ? (
                            <p className=" text-green-600 bg-gray-100 text-xs self-center px-2 rounded-full py-1">Verified</p>
                          ) : (
                            <button
                              onClick={() => resendEmail()}
                              className="text-xs bg-secondary hover:bg-primary text-white py-0 px-2 rounded-full"
                            >
                              Send Verification
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className=" capitalize">{detail?.value}</p>
                      )}
                    </div>
                  )}
                  {userMe?.id?.toString() === id?.toString() &&
                    (detail?.name === "Birth Date" ||
                      detail?.name === "Email" ||
                      detail?.name === "Telephone" ||
                      detail?.name === "Website" ||
                      detail?.name === "Facebook" ||
                      detail?.name === "Twitter" ||
                      detail?.name === "Instagram" ||
                      detail?.name === "Tiktok" ||
                      detail?.name === "Linkedin" ||
                      detail?.name === "Youtube") && (
                      <div>
                        {detail?.view ? (
                          <button onClick={() => handleUpdate(!detail?.view, detail?.hideName)}>
                            <GrView size={24} className="" />
                          </button>
                        ) : (
                          <button onClick={() => handleUpdate(!detail?.view, detail?.hideName)}>
                            <BiHide size={24} className="" />
                          </button>
                        )}
                      </div>
                    )}
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

ViewDetails.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  substabs: PropTypes.string,
};

export default ViewDetails;
