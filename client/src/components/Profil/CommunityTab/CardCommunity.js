import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AvatarGroup, Avatar } from "@mui/material";
import { MdGroups } from "react-icons/md";
import random_cover from "../../../assets/images/cover_group_random.png";
import { useJoinCommunity } from "../../../features/community/communitySlice";

const CardCommunity = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const joinCommunity = useJoinCommunity(["community", "join"], undefined, undefined);

  const handleJoin = async () => {
    setIsLoading(true);
    console.log(data?.id);
    const dataObj = {
      communityId: data?.id,
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
              {data?.coverPicture !== null ? (
                <img src={data?.coverPicture} alt={data?.name} className="w-full h-36 object-cover rounded-t-xl" />
              ) : (
                <img src={random_cover} alt={data?.name} className="w-full h-36 object-cover rounded-t-xl" />
              )}
            </div>

            <div className="transform translate-y-2/4 absolute w-full left-0 bottom-0 z-30 flex justify-center">
              <div className="flex items-center justify-center mask mask-squircle w-[86px] h-[86px] bg-gray-100">
                {data?.profilePicture !== null ? (
                  <img src={data?.profilePicture} className="object-cover mask mask-squircle w-[80px] h-[80px]" alt="profile_picture" />
                ) : (
                  <MdGroups size="60px" className="text-gray-300" />
                )}
              </div>
            </div>
          </div>
          <div className="px-4 pt-14">
            <Link to={"../../groups/" + data?.id} className="flex justify-center text-center text-xl font-semibold hover:text-primary">
              {data?.name}
            </Link>
          </div>
          <div className="px-4 pt-2">
            <p className="text-center text-sm text-gray-500">
              <span className="">{data?.privacyType}</span>
              <span className="">{" • "}</span>
              <span className="">{data?.privacyType}</span>
            </p>
          </div>
          <div className="pt-8 px-4 pb-4">
            <div className="flex justify-between">
              <AvatarGroup
                sx={{
                  "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
                  fontSize: "14px",
                }}
                total={24}
              >
                <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/53.jpg" />
                <Avatar sx={{ width: 24, height: 24 }} alt="Travis Howard" src="https://randomuser.me/api/portraits/men/54.jpg" />
                <Avatar sx={{ width: 24, height: 24 }} alt="Agnes Walker" src="https://randomuser.me/api/portraits/men/55.jpg" />
              </AvatarGroup>
              <button
                onClick={() => {
                  handleJoin();
                }}
                className="px-4 text-sm bg-gray-200 rounded-lg hover:bg-primary hover:text-white"
              >
                {isLoading ? "Loading..." : "Join"}
              </button>
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
