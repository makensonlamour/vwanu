import React from "react";
import PropTypes from "prop-types";
import { AvatarGroup, Avatar } from "@mui/material";

const CardCommunity = ({ data }) => {
  return (
    <>
      {data && (
        <div className="border border-gray-300 rounded-xl w-full">
          <div className="relative">
            <div className="">
              <img src={data?.coverPicture} alt={data?.name} className="w-full h-36 object-cover rounded-t-xl" />
            </div>
            <div className="transform translate-y-2/4 absolute w-full left-0 bottom-0 z-30 flex justify-center">
              <div className="flex items-center justify-center mask mask-squircle w-[86px] h-[86px] bg-gray-50">
                <img src={data?.profilePicture} className="object-cover mask mask-squircle w-[80px] h-[80px]" alt="profile_picture" />
              </div>
            </div>
          </div>
          <div className="px-4 pt-14">
            <p className="text-center text-xl font-semibold">{data?.name}</p>
          </div>
          <div className="px-4 pt-2">
            <p className="text-center text-sm text-gray-500">
              <span className="">{data?.privacy}</span>
              <span className="">{" • "}</span>
              <span className="">{data?.type}</span>
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
              <button className="px-4 text-sm bg-gray-200 rounded-lg hover:bg-primary hover:text-white">{data?.statut}</button>
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
