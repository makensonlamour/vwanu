import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import routesPath from "../../../routesPath";
import { format } from "date-fns";
// import { removeElementArray } from "../../../helpers";
import { useDeleteWorkplace } from "./../../../features/user/userSlice";

const ViewWorkplaces = ({ title, substabs, user }) => {
  const userMe = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const deleteWorkplace = useDeleteWorkplace(["workplace", "user"], undefined, undefined);

  const handleDelete = (id) => {
    // let data = removeElementArray(user, id);

    deleteWorkplace.mutateAsync({ id });

    window.location.reload();
  };

  return (
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
            Add
          </button>
        )}
      </div>
      {user?.length > 0 ? (
        user?.map((detail) => {
          return (
            <div key={detail?.name} className="flex gap-x-2 py-3">
              <p className="basis-2/3 text-gray-900">
                <span className="">{detail?.description}</span> {" at "} <span className="">{detail?.name}</span>
              </p>
              <p className="basis-1/3 text-gray-600">
                {detail?.from && format(new Date(detail?.from), "MMM yyyy")} {" - "}{" "}
                {detail?.to && format(new Date(detail?.to), "MMM yyyy")}
              </p>
              <button
                onClick={() => {
                  setEdit(true);
                  navigate("../.." + routesPath.PROFILE_EDIT + "?tabs=edit&subtabs=" + substabs + "&idWork=" + detail?.id, {
                    state: { edit },
                  });
                }}
                className="hover:text-primary"
              >
                <AiOutlineEdit size={"24px"} />
              </button>
              <button
                onClick={() => {
                  handleDelete(detail?.id);
                }}
                className="hover:text-primary"
              >
                <AiOutlineDelete size={"24px"} />
              </button>
            </div>
          );
        })
      ) : (
        <p className="py-4">Workplaces is empty</p>
      )}
    </div>
  );
};

ViewWorkplaces.propTypes = { title: PropTypes.string, user: PropTypes.array, substabs: PropTypes.string };

export default ViewWorkplaces;
