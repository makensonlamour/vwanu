import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import { useUpdateInvitation, useGetCommunityRole } from "../../../features/community/communitySlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";

const sendInvitationSuccess = () =>
  toast.success("You sent the invitation", {
    position: "top-center",
  });

const sendInvitationError = () =>
  toast.error("Sorry. Error on sending the invitation!", {
    position: "top-center",
  });

const MemberSettings = ({ data }) => {
  const user = useOutletContext();
  const { id } = useParams();
  const updateInvitation = useUpdateInvitation(["community", "invitaion"], id, undefined, undefined);
  const { data: roles } = useGetCommunityRole(["roles", "all"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendAdmin = async (_id, _role) => {
    setIsLoading(true);
    try {
      let roleCommunityId;
      roles?.data?.map((role) => {
        if (role?.name === _role) {
          return (roleCommunityId = role?.id);
        }
      });
      let guest = _id;
      const dataObj = {
        guestId: guest,
        CommunityRoleId: roleCommunityId,
      };

      await updateInvitation.mutateAsync(dataObj);
      sendInvitationSuccess();
    } catch (e) {
      sendInvitationError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="mt-8">
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
                    {user?.id !== member?.UserId && (
                      <div className="py-2 flex justify-start">
                        {member?.UserId !== user?.id && member?.CommunityRole?.name === "member" && (
                          <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                            {"Kick & Ban"}
                          </button>
                        )}
                        {member?.UserId !== user?.id &&
                          (member?.CommunityRole?.name === "member" || member?.CommunityRole?.name === "moderator") && (
                            <button
                              onClick={() => {
                                if (member?.CommunityRole?.name === "member") {
                                  handleSendAdmin(member?.UserId, "moderator");
                                } else {
                                  return;
                                }
                              }}
                              className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
                            >
                              {member?.CommunityRole?.name === "member" ? "Promote to Moderator" : "Demote to regular member"}
                            </button>
                          )}
                        {user?.id !== member?.UserId && member?.CommunityRole?.name !== "admin" && (
                          <button
                            onClick={() => {
                              handleSendAdmin(member?.UserId, "admin");
                            }}
                            className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
                          >
                            {isLoading ? <Loader /> : "Promote to Administrator"}
                          </button>
                        )}
                        {user?.id !== member?.UserId && member?.CommunityRole?.name === "member" && (
                          <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                            {"Remove from Group"}
                          </button>
                        )}
                      </div>
                    )}
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
};

export default MemberSettings;
