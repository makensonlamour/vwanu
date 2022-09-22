import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "../../common/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useAcceptInvitation } from "../../../features/community/communitySlice";
import { useOutletContext } from "react-router-dom";
import { MdGroups } from "react-icons/md";
// import { isInvitationReceive } from "../../../helpers";

const AcceptInvitationSuccess = (_text) =>
  toast.success("You" + _text + " the invitation.", {
    position: "top-center",
  });

const AcceptInvitationError = (_text) =>
  toast.error("Sorry. Error on " + _text + " invitation!", {
    position: "top-center",
  });

const ViewInvitation = ({ member }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const acceptInvitation = useAcceptInvitation(["invitation", "accept"], undefined, undefined);

  const handleAccept = async (_response) => {
    let CommunityId = member?.CommunityId;
    setLoading(true);
    try {
      const dataObj = {
        invitationId: member?.id,
        response: _response,
      };
      let result = await acceptInvitation.mutateAsync(dataObj);
      if (_response) {
        AcceptInvitationSuccess("accepted");
      } else {
        AcceptInvitationSuccess("declined");
      }

      queryClient.invalidateQueries();
      if (result?.data?.message === "Your response have been recorded") {
        window.location.href = `../groups/${CommunityId}`;
      }
    } catch (e) {
      if (_response) {
        AcceptInvitationError("accepting");
      } else {
        AcceptInvitationError("declining");
      }

      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div key={member?.id} className="border border-gray-200 p-4 w-full">
        {member?.host?.id === member?.guest?.id ? (
          <p className="pb-2 text-sm md:text-lg">{`You sent a request to be a ${member?.CommunityRole?.name} of`}</p>
        ) : (
          <p className="pb-2 text-sm md:text-lg">
            {`${member?.host?.firstName} ${member?.host?.lastName}  sent ${
              user?.id === member?.guest?.id ? "you" : member?.guest?.firstName + " " + member?.guest?.lastName
            } an invitation to be a ${member?.CommunityRole?.name} of`}
          </p>
        )}

        <div className="flex justify-start items-center">
          <div className="mr-3">
            {member?.Community?.profilePicture !== null || member?.Community?.profilePicture !== undefined ? (
              <MdGroups size="72px" className="text-gray-300 border border-gray-200 mask mask-squircle" />
            ) : (
              <img src={member?.Community?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-16 h-16" />
            )}
          </div>
          <div className="text-md ">
            <p className="font-semibold">
              {member?.Community?.name}
              <span className="ml-2 text-xs w-fit bg-gray-200 border-gray-200 border text-black px-2 mr-2 py-[0.1rem] rounded-md">
                {member?.Community?.privacyType}
              </span>
            </p>
            {/* From pending Invitations */}
            {member?.host?.id === member?.guest?.id && (
              <div className="py-2 flex justify-start">
                {member?.host?.id !== user?.id && (
                  <button
                    onClick={() => handleAccept(true)}
                    className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
                  >
                    {loading ? <Loader /> : "Accept"}
                  </button>
                )}
                <button
                  onClick={() => handleAccept(false)}
                  className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary "
                >
                  {loading ? <Loader /> : "Decline"}
                </button>
              </div>
            )}

            {/* From list invitations */}
            {member?.host?.id !== member?.guest?.id && (
              <div className="py-2 flex justify-start">
                {member?.host?.id !== user?.id && (
                  <button
                    onClick={() => handleAccept(true)}
                    className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
                  >
                    {loading ? <Loader /> : "Accept"}
                  </button>
                )}
                <button
                  onClick={() => handleAccept(false)}
                  className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary "
                >
                  {loading ? <Loader /> : "Decline"}
                </button>
              </div>
            )}
            <p className="">
              <span className="text-sm md:text-md">{member?.createdAt}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

ViewInvitation.propTypes = { member: PropTypes.object.isRequired };

export default ViewInvitation;
