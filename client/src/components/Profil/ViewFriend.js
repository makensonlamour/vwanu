/*eslint-disable*/
import React, { useState } from "react";
import { useSendFriendRequest } from "../../features/friend/friendSlice";
import { useSendFollow } from "../../features/follower/followerSlice";
import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
// import { checkFriendList } from "../../../helpers/index";
// import FriendButton from "../../features/friend/component/FriendButton";
import { useQueryClient } from "react-query";
import Loader from "../common/Loader";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import toast, { Toaster } from "react-hot-toast";
import EmptyComponent from "../common/EmptyComponent";
import { ImSad } from "react-icons/im";
import CustomViewFriend from "./CustomViewFriend";

const friendRequestError = () =>
  toast.error("Sorry. Error on sending Friend Request!", {
    position: "top-center",
  });

const followError = () =>
  toast.error("Sorry. Error on following this user!", {
    position: "top-center",
  });

const ViewFriend = ({ data, isLoading, isError, hasNextPage, fetchNextPage, arrayQuery, isNetwork = false }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  // const { data: listFriend } = useGetListFriend(["user", "friend"], true);
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = useSendFriendRequest(["user", "request"]);
  const sendFollow = useSendFollow(["user", "follow"]);

  function reloadPage() {
    queryClient.refetchQueries(arrayQuery);
  }

  const handleFollower = async (e, _id) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendFollow.mutateAsync({ UserId: _id });
      window.location.reload();
    } catch (e) {
      console.log(e);
      followError();
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRequest = async (e, _id) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendFriendRequest.mutateAsync({ UserID: _id });
      window.location.reload();
    } catch (e) {
      console.log(e);
      friendRequestError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="my-2 w-full">
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="py-5 m-auto text-center px-2 lg:px-2">
            {"There was an error while fetching the data. "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(arrayQuery)}>
              Tap to retry
            </Link>
          </div>
        ) : data?.pages?.length > 0 && data?.pages[0]?.data?.total > 0 ? (
          <InfiniteScroll
            fetchMore={fetchNextPage}
            isError={isError}
            isLoading={isLoading}
            hasNext={hasNextPage}
            refetch={() => queryClient.invalidateQueries(arrayQuery)}
            container={true}
            classNameContainer={"overflow-y-auto scrollbar max-h-[60vh] w-full"}
            loader={
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            }
            errorRender={
              <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                {"There was an error while fetching the data. "}{" "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(arrayQuery)}>
                  Tap to retry
                </Link>{" "}
              </div>
            }
          >
            <div className="flex flex-wrap lg:justify-between xl:justify-start py-2 w-full">
              {data?.pages?.map((page) => {
                return page?.data?.data?.map((friend) => {
                  return <CustomViewFriend data={friend} />;
                  /*<div
                      key={friend?.id}
                      className={`bg-white border-gray-200 w-[100%] sm:w-[49%] md:w-[100%] lg:w-[49%] xl:mx-2 rounded-xl border pt-8 hover:shadow-xl my-3 
                        ${isNetwork ? " xl:w-[48%] " : " xl:w-[31%] "}
                      `}
                    >
                      <img
                        className="object-cover w-28 h-28 mask mask-squircle mx-auto mb-2"
                        src={friend?.profilePicture?.original || friend?.User?.profilePicture || friend?.profilePicture}
                        alt="_profile"
                      />
                      <Link to={`../../profile/${friend?.id}`} className="hover:text-primary">
                        <p className="mx-auto py-3 font-semibold text-lg text-gray-900 text-center">
                          {(friend?.firstName || friend?.User?.firstName) + " " + (friend?.lastName || friend?.User?.lastName)}
                        </p>
                      </Link>
                      <p className="mx-auto font-normal text-sm text-gray-400 text-center">{friend?.createdAt}</p>
                      <div className="flex justify-center">
                        <p className="py-1 font-normal text-sm text-gray-400 text-center">
                          {friend?.amountOfFollower === 0
                            ? "0 Follower"
                            : friend?.amountOfFollower === 1
                            ? friend?.amountOfFollower + " Follower"
                            : friend?.amountOfFollower + " Followers"}
                        </p>
                        <span className="mx-1">•</span>
                        <p className="py-1 font-normal text-sm text-gray-400 text-center">
                          {friend?.amountOfFollowing === 0
                            ? "0 Following"
                            : friend?.amountOfFollowing === 1
                            ? friend?.amountOfFollowing + " Following"
                            : friend?.amountOfFollowing + " Following"}
                        </p>
                      </div>
                      <div className="px-4">
                        {user?.id?.toString() === friend?.id?.toString() ? (
                          <Link
                            to={`../../profile/${friend?.id}`}
                            className="capitalize mt-4 mb-8 rounded-xl px-3 btn btn-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0"
                          >
                            View Profile
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              window.location.href = `../../messages?newMessage=true&otherUserId=${friend?.id}`;
                            }}
                            className="capitalize mt-4 mb-8 rounded-xl px-3 btn btn-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0"
                          >
                            Send Message
                          </button>
                        )}
                      </div>
                      {user?.id?.toString() !== friend?.id?.toString() && (
                        <div className="flex border border-gray-300 rounded-b-xl -px-6 justify-around  bg-placeholder-color">
                          {friend?.iFollow ? (
                            <button disabled={true} className="basis-1/2 py-3 border-r bg-white border-gray-300 hover:bg-gray-100">
                              {loading ? (
                                <div className="flex justify-center py-5">
                                  <Loader color="black" />
                                </div>
                              ) : (
                                "Following"
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                handleFollower(e, friend?.id);
                              }}
                              className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100"
                            >
                              {loading ? (
                                <div className="flex justify-center py-5">
                                  <Loader color="black" />
                                </div>
                              ) : (
                                "Follow"
                              )}
                            </button>
                          )}

                          {/* connect friend }
                          {friend?.isFriend ? (
                            <button disabled={true} className="basis-1/2 py-3 border-l border-gray-300 hover:bg-gray-100  bg-white">
                              {loading ? (
                                <div className="flex justify-center py-5">
                                  <Loader color="black" />
                                </div>
                              ) : (
                                "Connected"
                              )}
                            </button>
                          ) : friend?.hasReceivedFriendRequest || friend?.hasSentFriendRequest ? (
                            <button disabled={true} className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100 bg-white">
                              {loading ? (
                                <div className="flex justify-center py-5">
                                  <Loader color="black" />
                                </div>
                              ) : friend?.hasReceivedFriendRequest ? (
                                "Request Received"
                              ) : (
                                "Request Sent"
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                handleFriendRequest(e, friend?.id);
                              }}
                              className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100"
                            >
                              {loading ? (
                                <div className="flex justify-center py-5">
                                  <Loader color="black" />
                                </div>
                              ) : (
                                "Connect"
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );*/
                });
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="flex justify-center">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, You don't follow anyone."}
              tips={"Follow someone you may know or appreciate to everything about they."}
            />
          </div>
        )}
      </div>
    </>
  );
};

ViewFriend.propTypes = {
  data: PropTypes.array,
  noDataLabel: PropTypes.any,
  types: PropTypes.string,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  isNetwork: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  arrayQuery: PropTypes.array,
};

export default ViewFriend;
