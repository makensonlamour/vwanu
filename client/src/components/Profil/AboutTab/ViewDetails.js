import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import routesPath from "../../../routesPath";

const ViewDetails = ({ title, user }) => {
  const userMe = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
        <div className="border-b flex justify-between items-center pb-4">
          <p className="font-bold text-lg">{title}</p>

          {userMe?.id?.toString() === id?.toString() && (
            <button
              onClick={() => {
                setEdit(true);
                navigate("../.." + routesPath.PROFILE_EDIT, { state: { edit } });
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
              {detail?.value && (
                <div key={detail?.name + "_" + detail?.value} className="flex py-3">
                  <p className="basis-1/3 text-gray-500">{detail?.name}</p>
                  <p className="basis-2/3 capitalize">{detail?.value}</p>
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
};

export default ViewDetails;
