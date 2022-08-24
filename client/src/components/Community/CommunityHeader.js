/*eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Routes, Route, useNavigate } from "react-router-dom";
import CommunityTabs from "./CommunityTabs";
import { allTabs1 } from "./Tablink.data";
import UpdatesComponent from "../Newsfeed/UpdatesComponent";
import { MdGroups } from "react-icons/md";
import random_cover from "../../assets/images/cover_group_random.png";
import ManageTabs from "./ManageTabs";
import PostTab from "./CommunityTab/PostTab";
import MembersTab from "./MembersTab";
import DiscussionTabs from "./DiscussionTabs";
import SendInviteTabs from "./SendInviteTabs";
import { Chip, Stack } from "@mui/material";

//core components
// import FriendRequestButton from "../../features/friend/component/FriendRequestButton";
// import FriendButton from "../../features/friend/component/FriendButton";
// import MenuButton from "../../features/friend/component/MenuButton";
// import Loader from "../common/Loader";
// import ProfileTabs from "./ProfileTabs";
// import UploadPhotoCrop from "../form/profile/UploadPhotoCrop";
// import AboutTab from "./AboutTab";
// import ViewFriend from "./ViewFriend";
// import PostTab from "./PostTab";
// import AlbumTab from "./AlbumTab";
// import NetworkTab from "./NetworkTab";
// import BlogTab from "./BlogTab";
// import { checkFriendList } from "../../helpers/index";
// import { FaUserEdit, FaUserAlt } from "react-icons/fa";
// import EditProfile from "../../pages/Profil/EditProfile";
// import { AiFillYoutube, AiFillTwitterCircle } from "react-icons/ai";
// import { BsFacebook } from "react-icons/bs";
// import { format } from "date-fns";

const CommunityHeader = ({ user, communityData, notificationList }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [over, setOver] = useState(false);

  const percentage = 73;

  const steps = [
    { title: "General Information", total: 6, complete: 5 },
    { title: "Work Experience", total: 3, complete: 1 },
    { title: "Profile Photo", total: 1, complete: 1 },
    { title: "Cover Photo", total: 1, complete: 1 },
  ];

  const latestUpdates = [
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "10 months ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=3",
      name: "Adele",
      date: "10 months ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "in the group Coffee Addicts",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "",
    },
  ];
  const otherUser = {};

  const dataBlog = {
    id: 1,
    profilePicture: "https://randomuser.me/api/portraits/men/56.jpg",
    coverPicture: "https://picsum.photos/600/600?random=1",
    name: "Mountain Riders",
    description: "Map out your future – but do it in pencil. The road ahead is as long as you make it. Make it worth the trip.",
    type: "Technology",
    privacy: "Public",
    userRole: "Organizer",
  };

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between w-full">
            <div className="w-[100vw] lg:w-[65vw] lg:basis-[72%]">
              <div className="border-gray-700 bg-white">
                <div className="relative w-full lg:w-[65vw]">
                  <div className="bg-gray-700 bg-repeat h-64">
                    {communityData?.coverPicture !== null ? (
                      <img
                        src={communityData?.coverPicture}
                        className="mx-auto max-h-64 w-full object-cover lg:h-[450px]"
                        alt="cover_profile"
                      />
                    ) : (
                      <img src={random_cover} className="mx-auto max-h-64 w-full object-cover lg:h-[450px]" alt="cover_profile" />
                    )}
                  </div>
                  <div className="transform translate-y-3/4 absolute w-[20%] left-10 bottom-0 z-30 flex justify-start">
                    <div className="flex items-center justify-center mask mask-squircle w-[156px] h-[156px] bg-gray-100">
                      {communityData?.profilePicture !== null ? (
                        <img
                          src={communityData?.profilePicture}
                          className="object-cover mask mask-squircle w-[150px] h-[150px]"
                          alt="profile_picture"
                        />
                      ) : (
                        <MdGroups size="78px" className="text-gray-300" />
                      )}
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
              <div className="rounded-b-lg border border-gray-300 bg-white pt-[0px] lg:pt-3 min-h-[250px]">
                <div className="py-4 relative">
                  <div className="lg:w-[65%] xl:w-[75%] absolute left-[13.5rem]">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center justify-between">
                        <h1 className="font-mock text-2xl font-semibold inline mr-2">{communityData?.name}</h1>
                        <p className="mx-2 bg-secondary px-2 pb-[0.25rem] rounded-lg text-white text-md align-middle">
                          {communityData?.privacyType}
                        </p>
                      </div>
                      {over ? (
                        <button
                          onMouseOut={() => setOver(false)}
                          className="flex justify-self-end px-6 bg-placeholder-color py-2 rounded-lg hover:bg-primary hover:text-white"
                        >
                          {"Leave Group"}
                        </button>
                      ) : (
                        <button
                          onMouseOver={() => setOver(true)}
                          className="flex justify-self-end px-6 bg-placeholder-color py-2 rounded-lg hover:bg-primary hover:text-white"
                        >
                          {user?.id === communityData?.UserId ? "Creator" : "Member"}
                        </button>
                      )}
                    </div>
                    <p className="pb-1 pt-3 flex items-center lg:w-[65%] xl:w-[75%]">
                      <Stack direction="row" spacing={1}>
                        {communityData?.Interests?.length > 0 &&
                          communityData?.Interests?.map((interest) => {
                            return <Chip key={interest?.id} label={interest?.name} size="small" />;
                          })}
                      </Stack>
                    </p>
                    <p className="py-2 w-[60%] text-sm">{communityData?.description}</p>
                    <p className="py-2 flex items-center">
                      {"Organizer:"}
                      <span className="ml-4">
                        <img src={user?.profilePicture?.original} className="mask mask-squircle w-8 h-8" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/*}
              <div className="rounded-b-lg border border-gray-300 bg-white pt-[0px] lg:pt-8 min-h-[220px]">
                <div className="py-4 text-center">
                  <div className="mb-4 lg:mb-2 block">
                    <h1 className="font-mock text-2xl font-semibold inline">{dataBlog?.name}</h1>
                    <h4 className="font-mock text-sm text-gray-600 mb-2 lg:0 mt-2">
                      {"From "}
                      {user.country ? user.country : ""}
                      <span className="px-2">•</span>
                      <span>{"Joined "}</span>
                    </h4>
                  </div>
                </div>
              </div>
                  {*/}
              <CommunityTabs communityData={communityData} user={user} otherUser={otherUser} />
              <div className="mt-8 px-2">
                <Routes>
                  <Route
                    path={allTabs1[0]}
                    element={
                      <div>
                        <PostTab />
                      </div>
                    }
                  />
                  <Route
                    path={allTabs1[1]}
                    element={
                      <div>
                        <MembersTab />
                      </div>
                    }
                  />
                  <Route path={allTabs1[2]} element={<div>Albums</div>} />
                  <Route
                    path={allTabs1[3]}
                    element={
                      <div>
                        <DiscussionTabs />{" "}
                      </div>
                    }
                  />
                  <Route
                    path={allTabs1[4]}
                    element={
                      <div>
                        <SendInviteTabs />
                      </div>
                    }
                  />
                  <Route path={allTabs1[5]} element={<div>Send Messages</div>} />
                  {user?.id.toString() === communityData?.UserId?.toString() && (
                    <Route
                      path={allTabs1[6]}
                      element={
                        <div>
                          <div>
                            <ManageTabs />
                          </div>
                        </div>
                      }
                    />
                  )}
                </Routes>
              </div>
            </div>

            <div className="hidden lg:block basis-[20%] ml-auto mx-2 mt-8">
              {/* <div className="block xl:hidden">
                <FollowingPreview data={listFollowing} />
                  </div>*/}
              <div className="block xl:hidden">
                <UpdatesComponent data={notificationList} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

CommunityHeader.propTypes = {
  user: PropTypes.object.isRequired,
  communityData: PropTypes.object,
  otherUser: PropTypes.object,
  listFriendRequest: PropTypes.array,
  listFriend: PropTypes.array,
  listFollowers: PropTypes.array,
  listRequest: PropTypes.array,
  listFollowing: PropTypes.array,
  notificationList: PropTypes.array,
};

export default CommunityHeader;
