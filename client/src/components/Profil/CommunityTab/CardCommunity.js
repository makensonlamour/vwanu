/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
import { AvatarGroup, Avatar, Chip, Stack } from "@mui/material";
import { MdGroups } from "react-icons/md";
import random_cover from "../../../assets/images/cover_group_random.png";
import { useJoinCommunity } from "../../../features/community/communitySlice";
// import { isInvitation, isInvitationReceive } from "../../../helpers/index";

const CardCommunity = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const joinCommunity = useJoinCommunity(["community", "join"], undefined, undefined);
  const user = useOutletContext();

  const handleJoin = async () => {
    setIsLoading(true);
    const dataObj = {
      CommunityId: data?.id,
    };

    try {
      if (data?.privacyType === "public") {
        let result = await joinCommunity.mutateAsync(dataObj);
        console.log(result);
      } else if (data?.privacyType === "private") {
        console.log("private");
      } else {
        console.log("hidden");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {data && (
        <div className="border border-gray-300 rounded-xl w-full">
          <div className="relative">
            <div className="bg-gray-700 rounded-t-xl">
              {data?.coverPicture === null || data?.coverPicture === undefined ? (
                <img src={random_cover} alt={data?.name} className="w-full h-32 md:h-36 object-cover rounded-t-xl" />
              ) : (
                <img src={data?.coverPicture} alt={data?.name} className="w-full h-32 md:h-36 object-cover rounded-t-xl" />
              )}
            </div>

            <div className="transform translate-y-2/4 absolute w-full left-0 bottom-0 z-30 flex justify-center">
              <div className="flex items-center justify-center mask mask-squircle w-[86px] h-[86px] bg-gray-100">
                {data?.profilePicture === null || data?.profilePicture === undefined ? (
                  <MdGroups size="60px" className="text-gray-300" />
                ) : (
                  <img src={data?.profilePicture} className="object-cover mask mask-squircle w-[80px] h-[80px]" alt="profile_picture" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center px-4 pt-14 pb-2 md:pb-4">
            <Link
              to={"../../groups/" + data?.id}
              state={data}
              className="flex justify-center text-center items-center text-lg md:text-xl font-semibold text-primary hover:text-secondary mr-2"
            >
              {data?.name}
            </Link>
            <p className="mx-1 bg-secondary px-2 pb-[0.25rem] rounded-lg text-white text-sm align-middle">{data?.privacyType}</p>
          </div>
          <div>
            <Stack className="flex justify-center w-full flex-wrap gap-2" direction="row">
              {data?.Interests?.length > 0 &&
                data?.Interests?.map((interest) => {
                  return <Chip key={interest?.id} label={interest?.name} size="small" />;
                })}
            </Stack>
          </div>
          <div className="pt-6 md:pt-8 px-4 pb-4">
            <div className="flex justify-between">
              <AvatarGroup
                sx={{
                  "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
                  fontSize: "14px",
                }}
                total={parseInt(data?.amountOfMembers)}
              >
                {data?.members?.length > 0 &&
                  data?.members?.map((member) => {
                    return (
                      <Avatar
                        key={member?.id}
                        sx={{ width: 24, height: 24 }}
                        alt={member?.firstName + " " + member?.lastName}
                        src={member?.profilePicture}
                      />
                    );
                  })}
              </AvatarGroup>
              {data?.IsMember !== null && Object.keys(data?.IsMember).length > 0 ? (
                <button className="px-4 text-sm bg-gray-200 rounded-lg hover:bg-primary hover:text-white">{data?.IsMember?.role}</button>
              ) : data?.pendingInvitation && data?.pendingInvitation?.length === 1 ? (
                <button
                  disabled={data?.pendingInvitation[0]?.hostId === data?.pendingInvitation[0]?.guestId ? false : true}
                  onClick={() => {
                    handleJoin();
                  }}
                  className="px-4 text-sm bg-gray-200 rounded-lg hover:bg-primary hover:text-white"
                >
                  {data?.pendingInvitation[0]?.hostId === data?.pendingInvitation[0]?.guestId ? "Request Sent" : "Accept Invitation"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleJoin();
                  }}
                  className="px-4 text-sm bg-gray-200 rounded-lg hover:bg-primary hover:text-white"
                >
                  {isLoading ? "Loading..." : "Join"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CardCommunity.propTypes = {
  data: PropTypes.object,
};

export default CardCommunity;
