/*eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Routes, Route, useNavigate } from "react-router-dom";
//core components
import FriendRequestButton from "../../features/friend/component/FriendRequestButton";
import FriendButton from "../../features/friend/component/FriendButton";
import MenuButton from "../../features/friend/component/MenuButton";
import Loader from "../../components/common/Loader";
import ProfileTabs from "./ProfileTabs";
import UploadPhotoCrop from "../../components/form/profile/UploadPhotoCrop";
import AboutTab from "./AboutTab";
import ViewFriend from "./ViewFriend";
import PostTab from "./PostTab";
import { allTabs1 } from "./Tablink.data";
import { checkFriendList } from "../../helpers/index";
import { FaUserEdit } from "react-icons/fa";
import EditProfile from "../../pages/Profil/EditProfile";
import CompleteProfile from "../../components/Newsfeed/CompleteProfile";
import { AiFillYoutube, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { format } from "date-fns";

const ProfileHeader = ({ user, otherUser, listFriend, listFollowers, listRequest, listFollowing }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const percentage = 73;

  const steps = [
    { title: "General Information", total: 6, complete: 5 },
    { title: "Work Experience", total: 3, complete: 1 },
    { title: "Profile Photo", total: 1, complete: 1 },
    { title: "Cover Photo", total: 1, complete: 1 },
  ];

  return (
    <>
      {!user && !otherUser ? (
        <Loader />
      ) : (
        <>
          <div className="flex ">
            <div className="rounded-t-lg lg:basis-[75%]">
              <div className="rounded-t-lg border-gray-700 bg-white">
                <div className="relative ">
                  <div className="">
                    <img
                      src={otherUser ? otherUser?.coverPicture?.original : user?.coverPicture?.original}
                      className="mx-auto max-h-52 w-full object-cover rounded-t-lg lg:h-[170px]"
                      alt="cover_profile"
                    />
                  </div>
                  <div className="transform translate-y-1/4 absolute w-full left-0 bottom-0 z-30 flex justify-center">
                    <div className="flex items-center justify-center mask mask-squircle w-[126px] h-[126px] bg-white">
                      <img
                        src={otherUser ? otherUser?.profilePicture?.original : user?.profilePicture?.original}
                        className="object-cover mask mask-squircle w-[120px] h-[120px]"
                        alt="profile_picture"
                      />
                    </div>
                  </div>

                  {/*otherUser ? null : (
                      <UploadPhotoCrop
                        fromButton="profile"
                        id={user?.id}
                        className="absolute bottom-[0%] right-[30%] lg:right-[0%] lg:bottom-[0%]"
                      />
                    )*/}
                </div>
              </div>

              <div className="rounded-b-lg border border-gray-300 bg-white pt-[70px] lg:pt-8 min-h-[120px]">
                <div className=" py-4 text-center 0">
                  <div className="mb-4 lg:mb-2 block">
                    <h1 className="font-mock text-2xl font-semibold text-primary inline">
                      {otherUser ? otherUser?.firstName + " " + otherUser?.lastName : user?.firstName + " " + user?.lastName}
                    </h1>
                    <h4 className="font-mock text-sm text-gray-600 mb-2 lg:0 mt-2">
                      {"From "}
                      {otherUser ? otherUser?.country : user.country ? user.country : ""}
                      <span className="px-2">•</span>
                      <span>
                        {"Joined "}
                        {format(new Date(otherUser ? otherUser?.createdAt : user?.createdAt), "MMM dd, yyyy")}
                      </span>
                    </h4>
                    <h4 className="font-mock text-sm text-gray-600 mb-2 lg:-mt-1 ">
                      <span className="pr-2">
                        {otherUser ? listFollowers?.length : listFollowers?.length}
                        {" followers"}
                      </span>
                      <span className="pl-2">
                        {otherUser ? listFollowing?.length : listFollowing?.length}
                        {" following"}
                      </span>
                    </h4>
                    <h4 className="font-mock text-primary flex text-sm mx-auto mb-2 text-center justify-center items-center lg:mt-2 ">
                      <div className="inline w-8 h-8 mr-2">
                        <BsFacebook size={"24px"} className="mx-auto" />
                      </div>
                      <div className="inline w-8 h-8  mr-2">
                        <AiFillYoutube size={"24px"} className="mx-auto" />
                      </div>
                      <div className="inline w-8 h-8  mr-2">
                        <AiFillTwitterCircle size={"24px"} className="mx-auto" />
                      </div>
                    </h4>
                  </div>
                  <div>
                    {otherUser && <FriendRequestButton user={user} otherUser={otherUser} />}

                    {
                      otherUser && <MenuButton user={user} otherUser={otherUser} />

                      /*(
                      <button className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end">
                        Message
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEdit(true);
                          navigate("./about", { state: { edit } });
                        }}
                        className="items-center align-middle btn btn-sm btn-secondary text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-primary justify-end"
                      >
                        <FaUserEdit size={"18px"} />
                        <span className="ml-1"> Edit Profile</span>
                      </button>
                      )*/
                    }
                  </div>
                  {/*}
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
                        <button
                          onClick={() => {
                            setEdit(true);
                            navigate("./about", { state: { edit } });
                          }}
                          className="items-center align-middle btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end"
                        >
                          <FaUserEdit size={"18px"} />
                          <span className="ml-1"> Edit Profile</span>
                        </button>
                        )}
                    </div>
                    {*/}
                </div>
                {/*}  <h2 className="font-mock text-gray-500">{otherUser ? otherUser?.about : user?.about ? user?.about : ""}</h2>{*/}
              </div>
              <ProfileTabs user={user} otherUser={otherUser} />
              <div className="mt-8 ">
                <Routes>
                  <Route path={allTabs1[0]} element={<PostTab user={user} otherUser={otherUser} listFollowing={listFollowing} />} />
                  <Route
                    path={allTabs1[1]}
                    element={<div>{edit ? <EditProfile user={user} /> : <AboutTab user={otherUser ? otherUser : user} />}</div>}
                  />
                  <Route
                    path={allTabs1[2]}
                    element={
                      <div>
                        <ViewFriend />
                      </div>
                    }
                  />
                  <Route path={allTabs1[3]} element={<div>Album</div>} />
                  <Route path={allTabs1[4]} element={<div>Likes</div>} />
                </Routes>
              </div>
            </div>

            <div className="basis-[22%] ml-auto mt-8">
              <CompleteProfile percentage={percentage} data={steps} />
            </div>
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
  listFriend: PropTypes.array,
  listFollowers: PropTypes.array,
  listRequest: PropTypes.array,
  listFollowing: PropTypes.array,
};

export default ProfileHeader;
