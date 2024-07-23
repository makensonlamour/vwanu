import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams, Link } from "react-router-dom";
import {
  useSendInvitation,
  useGetCommunityRole,
  useUpdateCommunityUser,
  useDeleteCommunityUser,
} from "../../../features/community/communitySlice";
import { useCreateCommunityBan } from "../../../features/community/banSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { useQueryClient } from "react-query";

const sendInvitationSuccess = () =>
  toast.success("You sent the invitation", {
    position: "top-center",
  });

const sendInvitationError = () =>
  toast.error("Sorry. Error on sending the invitation!", {
    position: "top-center",
  });

const banSuccess = () =>
  toast.success("You Kick & Ban this user successfully.", {
    position: "top-center",
  });

const banError = () =>
  toast.error("Sorry. Error on kicking out this member!", {
    position: "top-center",
  });

const leaveSuccess = () =>
  toast.success("You leave this community successfully.", {
    position: "top-center",
  });

const leaveError = () =>
  toast.error("Sorry. Error on leaving this community!", {
    position: "top-center",
  });

const MemberSettings = ({ data, isCreator = false }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const { id } = useParams();
  const sendInvitation = useSendInvitation(["community", "invitation"], undefined, undefined);
  const updateCommunityUser = useUpdateCommunityUser(["community", "update"], id, undefined, undefined);

  const createCommunityBan = useCreateCommunityBan(["community_ban", "post"], undefined, undefined);
  const leaveCommunityUser = useDeleteCommunityUser(["community", "update"], id, undefined, undefined);
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
        CommunityId: id,
      };

      await sendInvitation.mutateAsync(dataObj);
      queryClient.invalidateQueries(["community", "invitation"]);
      sendInvitationSuccess();
    } catch (e) {
      sendInvitationError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   *
   * @param {string} userId | Id of the user you want to ban
   * @param {string} communityId | id of the community you want to ban the user from
   */
  const handleKickBan = async (userId, communityId) => {
    setIsLoading();
    try {
      const dataObj = {
        userId,
        communityId,
      };
      await createCommunityBan.mutateAsync(dataObj);
      // await updateCommunityUser.mutateAsync(dataObj);
      queryClient.invalidateQueries(["community", "members", id]);
      banSuccess();
    } catch (e) {
      banError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const demoteUser = async (_id, _role) => {
    setIsLoading();
    try {
      let roleCommunityId;
      roles?.data?.map((role) => {
        if (role?.name === _role) {
          return (roleCommunityId = role?.id);
        }
      });
      const dataObj = {
        CommunityRoleId: roleCommunityId,
        id: _id,
      };
      await updateCommunityUser.mutateAsync(dataObj);
      queryClient.invalidateQueries(["community", "members", id]);
      banSuccess();
    } catch (e) {
      banError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveGroup = async (_id) => {
    setIsLoading();
    try {
      await leaveCommunityUser.mutateAsync({ id: _id });
      queryClient.invalidateQueries(["community", "members", id]);
      leaveSuccess();
      window.location.href = "../../groups";
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
      <div className="mt-8">
        {console.log({ m: data[0] })}
        {data?.length > 0 &&
          data?.map((member) => {
            console.log({ member });
            return (
              <div key={member?.id} className="border border-gray-200 p-4">
                <div className="flex justify-start items-center">
                  <div className="mr-3">
                    <img src={member?.User?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-10 h-10" />
                  </div>
                  <div className="text-md">
                    <Link to={"../../profile/" + member?.User?.id} className="text-primary hover:text-secondary">
                      {member?.User?.firstName + " " + member?.User?.lastName}
                    </Link>
                    <div className="py-2 flex justify-start flex-wrap">
                      {user?.id === member?.UserId && !isCreator && (
                        <button
                          onClick={() => {
                            leaveGroup(member?.id);
                          }}
                          className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                        >
                          {"Leave Community"}
                        </button>
                      )}
                      {user?.id !== member?.UserId && isCreator && member?.CommunityRole?.name === "admin" && (
                        <button
                          onClick={() => {
                            demoteUser(member?.id, "moderator");
                          }}
                          className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                        >
                          {"Demote to moderator"}
                        </button>
                      )}
                      {user?.id !== member?.UserId && isCreator && member?.CommunityRole?.name === "admin" && (
                        <button
                          onClick={() => {
                            demoteUser(member?.id, "member");
                          }}
                          className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                        >
                          {"Demote to member"}
                        </button>
                      )}
                      {user?.id !== member?.UserId && (
                        <>
                          {member?.UserId !== user?.id && member?.CommunityRole?.name === "member" && (
                            <button
                              onClick={() => {
                                handleKickBan(member?.UserId, member?.CommunityId);
                              }}
                              className="py-1 my-1 text-xs w-fit bg-secondary text-white px-2 mr-2 rounded-lg hover:bg-primary"
                            >
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
                                    demoteUser(member?.id, "member");
                                  }
                                }}
                                className="py-1 my-1 text-xs w-fit bg-secondary text-white px-2 mr-2 rounded-lg hover:bg-primary"
                              >
                                {member?.CommunityRole?.name === "member" ? "Promote to Moderator" : "Demote to regular member"}
                              </button>
                            )}
                          {user?.id !== member?.UserId && member?.CommunityRole?.name !== "admin" && (
                            <button
                              onClick={() => {
                                handleSendAdmin(member?.UserId, "admin");
                              }}
                              className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                            >
                              {isLoading ? <Loader /> : "Promote to Administrator"}
                            </button>
                          )}
                        </>
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
