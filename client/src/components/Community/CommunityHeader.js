import React, { useState } from "react";
import PropTypes from "prop-types";
import { Routes, Route, useLocation, useOutletContext, useParams } from "react-router-dom";
import CommunityTabs from "./CommunityTabs";
import { allTabs1 } from "./Tablink.data";
import UpdatesComponent from "../Newsfeed/UpdatesComponent";
import { MdGroups } from "react-icons/md";
import { ImSad } from "react-icons/im";
import random_cover from "../../assets/images/cover_group_random.png";
import ManageTabs from "./ManageTabs";
import PostTab from "./CommunityTab/PostTab";
import MembersTab from "./MembersTab";
import DiscussionTabs from "./DiscussionTabs";
import SendInviteTabs from "./SendInviteTabs";
import { Chip, Stack } from "@mui/material";
import EmptyComponent from "./../common/EmptyComponent";
import BlogComponent from "../../components/Newsfeed/BlogComponent";
import FollowingPreview from "../../components/Newsfeed/FollowingPreview";
import RecentlyActive from "../../components/Newsfeed/RecentlyActive";
import GroupsPreview from "../../components/Newsfeed/GroupsPreview";
import { useSendInvitation, useGetCommunityRole, useJoinCommunity } from "../../features/community/communitySlice";
import { useGetBlogList } from "../../features/blog/blogSlice";
import { useGetOnline } from "../../features/user/userSlice";
import { useGetListFollowing } from "../../features/follower/followerSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/common/Loader";

const sendInvitationSuccess = () =>
  toast.success("You sent the invitation", {
    position: "top-center",
  });

const sendInvitationError = () =>
  toast.error("Sorry. Error on sending the invitation!", {
    position: "top-center",
  });

const CommunityHeader = ({ communityData, notificationList }) => {
  const location = useLocation();
  const data = location.state;
  const user = useOutletContext();
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // const [over, setOver] = useState(false);
  const sendInvitation = useSendInvitation(["community", "invitation"], undefined, undefined);
  const joinCommunity = useJoinCommunity(["community", "join"], undefined, undefined);
  const { data: roles } = useGetCommunityRole(["roles", "all"], true);
  const { data: blogList, isError, isLoading: loadingBlog } = useGetBlogList(["blog", "all"], true);
  const { data: listFollowing, isLoading: loadingFollowing, isError: errorFollowing } = useGetListFollowing(["user", "following"], true);

  const {
    data: listOnline,
    isLoading: loadingOnline,
    isError: onlineError,
    hasNextPage: hasNextPageOnline,
    fetchNextPage: fetchNextPageOnline,
  } = useGetOnline(["user", "online"]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let roleCommunityId;
      // eslint-disable-next-line array-callback-return
      roles?.data?.map((role) => {
        if (role?.name === "member") {
          return (roleCommunityId = role?.id);
        }
      });
      // let guest = selectMember?.map((mem) => {
      //   return mem?.id;
      // });
      const dataObj = {
        CommunityId: id,
      };

      if (communityData?.privacy === "public" || data?.privacyType === "public") {
        await joinCommunity.mutateAsync(dataObj);
      } else if (data?.privacyType === "private" || communityData?.privacy === "private") {
        dataObj.guestId = user?.id;
        dataObj.CommunityRoleId = roleCommunityId;
        await sendInvitation.mutateAsync(dataObj);
      } else {
        return;
      }

      sendInvitationSuccess();
      window.location.reload();
    } catch (e) {
      sendInvitationError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  let invite = false;
  let inviteReceive = false;

  console.log(communityData);

  return (
    <>
      <Toaster />
      {!user ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between w-full">
            <div className="w-[100vw] lg:w-[65vw] lg:basis-[72%]">
              <div className="border-gray-700 bg-white">
                <div className="relative w-full lg:w-[65vw]">
                  <div className="bg-gray-700 bg-repeat h-52 lg:h-64">
                    {communityData?.coverPicture === null || communityData?.coverPicture === undefined ? (
                      <img src={random_cover} className="mx-auto max-h-64 w-full object-cover lg:h-[450px]" alt="cover_profile" />
                    ) : (
                      <img
                        src={communityData?.coverPicture}
                        className="mx-auto max-h-64 w-full object-cover lg:h-[450px]"
                        alt="cover_profile"
                      />
                    )}
                  </div>
                  <div className="transform translate-y-2/4 lg:translate-y-3/4 absolute lg:w-[20%] inset-x-1/2 lg:left-10 bottom-0 z-30 flex justify-center lg:justify-start">
                    <div className="flex items-center justify-center mask mask-squircle w-[156px] h-[156px] bg-gray-100">
                      {communityData?.profilePicture === null || communityData?.profilePicture === undefined ? (
                        <MdGroups size="92px" className="text-gray-300" />
                      ) : (
                        <img
                          src={communityData?.profilePicture || data?.profilePicture}
                          className="object-cover mask mask-squircle w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]"
                          alt="profile_picture"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg border border-gray-300 bg-white pt-12 lg:pt-3 min-h-[250px]">
                <div className="py-4 relative">
                  <div className="w-full lg:w-[65%] xl:w-[75%] absolute lg:left-[13.5rem]">
                    <div className="flex flex-row items-center justify-center lg:justify-between">
                      <div className="flex items-center justify-between">
                        <h1 className="font-mock text-lg lg:text-2xl text-center lg:text-left font-semibold inline mr-2">
                          {communityData?.name || data?.name}
                        </h1>
                        <p className="mx-2 bg-secondary px-2 pb-1 lg:pb-[0.25rem] rounded-lg text-white text-sm lg:text-md align-middle">
                          {communityData?.privacyType || data?.privacyType}
                        </p>
                      </div>
                      {communityData?.IsMember === null || data?.IsMember === null ? (
                        !invite ? (
                          <button
                            onClick={handleSubmit}
                            className="hidden lg:flex justify-self-end px-6 bg-placeholder-color py-2 rounded-lg hover:bg-primary hover:text-white"
                          >
                            {"Join"}
                          </button>
                        ) : (
                          <button
                            disabled={inviteReceive ? false : true}
                            onClick={handleSubmit}
                            className="hidden lg:flex justify-self-end px-6 bg-placeholder-color py-2 rounded-lg hover:bg-primary hover:text-white disabled:bg-placeholder-color disabled:text-black"
                          >
                            {inviteReceive ? "Accept Invitation" : "Request Sent"}
                          </button>
                        )
                      ) : (
                        <button className="hidden lg:flex justify-self-end px-6 bg-placeholder-color py-2 rounded-lg hover:bg-primary hover:text-white">
                          {communityData?.IsMember?.role}
                        </button>
                      )}
                    </div>
                    <p className="pb-1 pt-5 lg:pt-3 flex items-center justify-center lg:justify-start lg:w-[65%] xl:w-[75%]">
                      <Stack direction="row" spacing={1}>
                        {((communityData?.Interests?.length > 0 || data?.Interests?.length > 0) &&
                          communityData?.Interests?.map((interest) => {
                            return <Chip key={interest?.id} label={interest?.name} size="small" />;
                          })) ||
                          data?.Interests?.map((interest) => {
                            return <Chip key={interest?.id} label={interest?.name} size="small" />;
                          })}
                      </Stack>
                    </p>
                    <p className="py-3 lg:py-2 w-full lg:w-[60%] text-sm text-center lg:text-left">
                      {communityData?.description || data?.description}
                    </p>
                    <div className="lg:flex-none flex justify-between items-center px-2">
                      <p className=" lg:px-0 py-2 flex items-center text-sm lg:text-md">
                        {"Organizer:"}
                        <span className="ml-4">
                          <img alt={communityData?.name} src={user?.profilePicture?.original} className="mask mask-squircle w-8 h-8" />
                        </span>
                      </p>
                      <div className="lg:hidden">
                        {communityData?.IsMember === null || data?.IsMember === null ? (
                          !invite ? (
                            <button
                              onClick={handleSubmit}
                              className="text-sm lg:hidden flex justify-self-end px-2 lg:px-6 bg-placeholder-color py-1 lg:py-2 rounded-lg hover:bg-primary hover:text-white"
                            >
                              {"Join"}
                            </button>
                          ) : (
                            <button
                              disabled={inviteReceive ? false : true}
                              onClick={handleSubmit}
                              className="text-sm lg:hidden flex justify-self-end px-2 lg:px-6 bg-placeholder-color py-1 lg:py-2 rounded-lg hover:bg-primary hover:text-white disabled:bg-placeholder-color disabled:text-black"
                            >
                              {inviteReceive ? "Accept Invitation" : "Request Sent"}
                            </button>
                          )
                        ) : (
                          <button className="text-sm lg:hidden flex justify-self-end px-2 lg:px-6 bg-placeholder-color py-1 lg:py-2 rounded-lg hover:bg-primary hover:text-white">
                            {communityData?.IsMember?.role}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {communityData?.id && <CommunityTabs communityData={communityData} user={user} />}
              {communityData?.id ? (
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
                          <DiscussionTabs communityData={communityData} />{" "}
                        </div>
                      }
                    />
                    <Route
                      path={allTabs1[4]}
                      element={
                        <div>
                          {communityData?.IsMember !== null ? (
                            <SendInviteTabs />
                          ) : (
                            <div className="flex justify-center py-5">
                              <EmptyComponent
                                icon={<ImSad size={"32px"} className="" />}
                                placeholder={"Sorry, You can't view this section of the community."}
                                tips={
                                  "To see this community section, you need to be a member of this community. You can be a member by simply click on the button Join."
                                }
                              />
                            </div>
                          )}
                        </div>
                      }
                    />
                    {/* <Route path={allTabs1[5]} element={<div>Send Messages</div>} /> */}
                    {(communityData?.IsMember?.role === "admin" || communityData?.IsMember?.role === "moderator") && (
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
              ) : (
                <div className="flex justify-center py-5">
                  <EmptyComponent
                    icon={<ImSad size={"32px"} className="" />}
                    placeholder={"Sorry, You can't view this community activities."}
                    tips={
                      "To see this community activities, you should make a request to join the community first by clicking on the button join."
                    }
                  />
                </div>
              )}
            </div>

            <div className="hidden lg:block basis-[20%] lg:ml-4 xl:ml-2 mt-8">
              <BlogComponent data={blogList?.pages[0]?.data?.data || []} isLoading={loadingBlog} isError={isError} />
              <RecentlyActive
                data={listOnline || []}
                isLoading={loadingOnline}
                isError={onlineError}
                hasNextPage={hasNextPageOnline}
                fetchNextPage={fetchNextPageOnline}
              />
              <GroupsPreview />
              {/* <CompleteProfile percentage={percentage} data={steps} /> */}
              <div className="block xl:hidden">
                <FollowingPreview
                  isLoading={loadingFollowing}
                  isError={errorFollowing}
                  data={listFollowing ? listFollowing?.pages[0]?.data?.data : []}
                />
              </div>
              <div className="block xl:hidden my-2">
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
  listFriendRequest: PropTypes.array,
  listFriend: PropTypes.array,
  listFollowers: PropTypes.array,
  listRequest: PropTypes.array,
  listFollowing: PropTypes.array,
  notificationList: PropTypes.array,
};

export default CommunityHeader;
