import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import routesPath from "../../../routesPath";
import { useUpdateUser } from "../../../features/user/userSlice";

const ViewDetails = ({ title, user, substabs }) => {
  const userMe = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);

  const handleUpdate = async (isHide, hideName) => {
    try {
      const dataObj = { id: userMe?.id };
      dataObj[hideName] = isHide;

      await updateUser.mutateAsync(dataObj);

      window.location.href = "../../profile/" + userMe?.id;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
        <div className="border-b flex justify-between items-center pb-4">
          <p className="font-bold text-lg">{title}</p>

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
                <div key={detail?.name} className="flex py-3">
                  <p className="basis-1/3 text-gray-500">{detail?.name}</p>
                  {detail?.name === "Interest" ? (
                    detail?.value?.length > 0 ? (
                      <div className="flex justify-start gap-x-2">
                        {detail?.value?.map((interest) => {
                          return (
                            <p key={interest?.id} className="bg-gray-100 px-2 py-1 text-xs rounded-full">
                              {interest?.name}
                            </p>
                          );
                        })}
                      </div>
                    ) : null
                  ) : (
                    <p className="basis-2/3 capitalize">{detail?.value}</p>
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
                          <button onClick={() => handleUpdate(!detail?.view, detail?.hideName)}>Hide</button>
                        ) : (
                          <button onClick={() => handleUpdate(!detail?.view, detail?.hideName)}>View</button>
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
