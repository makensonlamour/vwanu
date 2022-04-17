import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
//core components
import FriendRequestButton from "../../features/friend/component/FriendRequestButton";
import FriendButton from "../../features/friend/component/FriendButton";
import Loader from "../../components/common/Loader";
import ProfileTabs from "./ProfileTabs";
import PostTab from "./PostTab";
import { allTabs1 } from "./Tablink.data";
import { checkFriendList } from "../../helpers/index";
import { FaUserEdit } from "react-icons/fa";

const ProfileHeader = ({ user, otherUser, listFriendRequest }) => {
  return (
    <>
      {!user && !otherUser ? (
        <Loader />
      ) : (
        <>
          <div className="mx-2 bg-white shadow-lg rounded-lg overflow-hidden lg:w-full">
            <div className="relative">
              <img
                src={otherUser ? otherUser?.coverPicture : user.coverPicture}
                className="w-full bg-white h-[150px] lg:h-[250px]"
                alt="cover_profil"
              />
              <div className="w-full absolute bottom-0 left-0 transform translate-y-3/4 lg:w-auto lg:translate-x-1/3 flex justify-center">
                <img
                  src={otherUser ? otherUser?.profilePicture : user.profilePicture}
                  className="bg-white mask mask-squircle w-[100px] h-[100px] lg:w-[140px] lg:h-[140px]"
                  alt="profile_picture"
                />
              </div>
            </div>

            <div className="bg-white pt-[70px] lg:pt-0 lg:pl-[200px] min-h-[120px]">
              <div className="pr-4 pl-2 py-4 text-center lg:text-left lg:flex items-center justify-between">
                <div className="mb-4 lg:mb-2 block">
                  <h1 className="font-mock text-2xl text-gray-700 inline lg:mr-32">
                    {otherUser ? otherUser?.firstName + " " + otherUser?.lastName : user?.firstName + " " + user?.lastName}
                  </h1>
                  <h4 className="font-mock text-sm text-gray-600 mb-2 lg:0 mt-1">
                    {"I am from "}
                    {otherUser ? otherUser?.country : user.country ? user.country : ""}
                  </h4>
                  <h4 className="font-mock text-md text-gray-600 mb-2 lg:0 ">
                    {otherUser ? otherUser?.friends : user?.friends ? user?.friends?.length + " Friends" : null}
                  </h4>
                </div>
                <div>
                  {checkFriendList(listFriendRequest?.data?.user?.friends, otherUser?.id) ? (
                    <FriendButton otherUser={otherUser} />
                  ) : (
                    <FriendRequestButton user={user} otherUser={otherUser} />
                  )}
                  {otherUser ? (
                    <button className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end">
                      Message
                    </button>
                  ) : (
                    <button className="items-center align-middle btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end">
                      <FaUserEdit size={"18px"} />
                      <span className="ml-1"> Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
              <h2 className="font-mock text-gray-500">{otherUser ? otherUser?.bio : user.bio ? user.bio : ""}</h2>
            </div>
            <ProfileTabs user={user} otherUser={otherUser} />
          </div>
          <div className="mt-4 ">
            <Routes>
              <Route path={allTabs1[0]} element={<PostTab user={user} otherUser={otherUser} />} />
              <Route path={allTabs1[1]} element={<div>About</div>} />
              <Route path={allTabs1[2]} element={<div>Friends</div>} />
              <Route path={allTabs1[3]} element={<div>About</div>} />
              <Route path={allTabs1[4]} element={<div>Friends</div>} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
  listFriendRequest: PropTypes.array,
};

export default ProfileHeader;
