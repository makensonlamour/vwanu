import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import { useDeleteCommunityUser } from "../../../features/community/communitySlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../common/Loader";
import { useQueryClient } from "react-query";

// const sendInvitationSuccess = () =>
//   toast.success("You sent the invitation", {
//     position: "top-center",
//   });

// const sendInvitationError = () =>
//   toast.error("Sorry. Error on sending the invitation!", {
//     position: "top-center",
//   });

const leaveSuccess = () =>
  toast.success("You leave this community successfully.", {
    position: "top-center",
  });

const leaveError = () =>
  toast.error("Sorry. Error on leaving this community!", {
    position: "top-center",
  });

const MemberSettings = ({ data, isCreator }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const { id } = useParams();
  console.log(data);
  const leaveCommunityUser = useDeleteCommunityUser(["community", "update"], undefined, undefined);
  const [isLoading, setIsLoading] = useState(false);

  const leaveGroup = async (_id) => {
    setIsLoading();
    try {
      await leaveCommunityUser.mutateAsync({ id: _id });
      queryClient.invalidateQueries(["community", "members", id]);
      leaveSuccess();
    } catch (e) {
      leaveError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="my-4">
        {data?.length > 0 &&
          data?.map((member) => {
            return (
              <div key={member?.id} className="border border-gray-200 p-4">
                <div className="flex justify-start items-center">
                  <div className="mr-3">
                    <img src={member?.User?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-10 h-10" />
                  </div>
                  <div className="text-md">
                    <p className="">{member?.User?.firstName + " " + member?.User?.lastName}</p>
                    <div className="py-2 flex justify-start flex-wrap">
                      {user?.id === member?.UserId && !isCreator && (
                        <button
                          onClick={() => {
                            leaveGroup(member?.id);
                          }}
                          className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                        >
                          {isLoading ? <Loader /> : "Leave Community"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

MemberSettings.propTypes = {
  data: PropTypes.array.isRequired,
  isCreator: PropTypes.bool,
};

export default MemberSettings;
