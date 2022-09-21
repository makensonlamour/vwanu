import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "../../common/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useAcceptInvitation } from "../../../features/community/communitySlice";
import { useOutletContext } from "react-router-dom";
import { MdGroups } from "react-icons/md";

const AcceptInvitationSuccess = () =>
  toast.success("You accepted the invitation", {
    position: "top-center",
  });

const AcceptInvitationError = () =>
  toast.error("Sorry. Error on accepting invitation!", {
    position: "top-center",
  });

const declineInvitationSuccess = () =>
  toast.success("You declined the invitation", {
    position: "top-center",
  });

const declineInvitationError = () =>
  toast.error("Sorry. Error on declining invitation!", {
    position: "top-center",
  });

const ViewInvitation = ({ member }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const acceptInvitation = useAcceptInvitation(["invitation", "accept"], undefined, undefined);

  const handleAccept = async () => {
    let CommunityId = member?.CommunityId;
    setLoading(true);
    try {
      const dataObj = {
        invitationId: member?.id,
        response: true,
      };
      let result = await acceptInvitation.mutateAsync(dataObj);
      AcceptInvitationSuccess();
      if (result?.data?.message === "Your response have been recorded") {
        window.location.href = `../groups/${CommunityId}`;
      }
    } catch (e) {
      AcceptInvitationError();
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      const dataObj = {
        invitationId: member?.id,
        response: false,
      };
      let result = await acceptInvitation.mutateAsync(dataObj);
      declineInvitationSuccess();
      if (result?.data?.message === "Your response have been recorded") {
        queryClient.invalidateQueries(["community", "invitation", "all"]);
      }
    } catch (e) {
      declineInvitationError();
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster />
      <div key={member?.id} className="border border-gray-200 p-4 w-full">
        <p className="pb-2 text-sm md:text-lg">
          {`${member?.host?.firstName} ${member?.host?.lastName}  sent ${
            user?.id === member?.guest?.id ? "you" : member?.guest?.firstName + " " + member?.guest?.lastName
          } an invitation to be a ${member?.CommunityRole?.name} of`}
        </p>

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

            <div className="py-2 flex justify-start">
              <button
                onClick={() => handleAccept()}
                className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
              >
                {loading ? <Loader /> : "Accept"}
              </button>
              <button
                onClick={() => handleDecline()}
                className="text-xs w-fit bg-secondary text-white px-4 mr-2 py-[0.1rem] rounded-lg hover:bg-primary "
              >
                {loading ? <Loader /> : "Decline"}
              </button>
            </div>
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
