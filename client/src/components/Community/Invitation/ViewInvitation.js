/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "../../common/Loader";
import { useJoinCommunity } from "../../../features/community/communitySlice";

const ViewInvitation = ({ member }) => {
  console.log(member);
  const [loading, setLoading] = useState(false);
  const acceptInvitation = useJoinCommunity(["invitation", "accept"], undefined, undefined);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const dataObj = {
        CommunityId: member?.CommunityId,
      };
      let result = await acceptInvitation.mutateAsync(dataObj);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    setLoading(true);
    try {
      console.log("accept");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div key={member?.id} className="border border-gray-200 p-4 w-full">
        <p className="pb-2">
          {member?.host?.firstName +
            " " +
            member?.host?.lastName +
            " sent you an invitation to be a " +
            member?.CommunityRole?.name +
            " of"}
        </p>

        <div className="flex justify-start items-center">
          <div className="mr-3">
            <img src={member?.guest?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-16 h-16" />
          </div>
          <div className="text-md">
            <p className="">{member?.guest?.firstName + " " + member?.guest?.lastName}</p>

            <div className="py-2 flex justify-start">
              <button
                onClick={() => handleAccept()}
                className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
              >
                {loading ? <Loader /> : "Accept Invitation"}
              </button>
              <button
                onClick={() => handleDecline()}
                className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary"
              >
                {loading ? <Loader /> : "Decline Invitation"}
              </button>
            </div>
            <p classNAme="">
              <span className="">{member?.createdAt}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

ViewInvitation.propTypes = { member: PropTypes.array.isRequired };

export default ViewInvitation;
