import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, Link } from "react-router-dom";
import {
  useSendFriendRequest,
  useCancelFriendRequest,
  useAcceptFriendRequest,
  useDeclineFriendRequest,
  useUnfollowUser,
  useUnfriendUser,
} from "../../features/friend/friendSlice";
import { useSendFollow } from "../../features/follower/followerSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/common/Loader";
import { useQueryClient } from "react-query";

const sendInvitationSuccess = () =>
  toast.success("You sent the invitation", {
    position: "top-center",
  });

const sendInvitationError = () =>
  toast.error("Sorry. Error on sending the invitation!", {
    position: "top-center",
  });

const cancelSuccess = () =>
  toast.success("You cancel this request", {
    position: "top-center",
  });

const cancelError = () =>
  toast.error("Sorry. Error on canceling the invitation!", {
    position: "top-center",
  });

const followSuccess = () =>
  toast.success("You follow this user", {
    position: "top-center",
  });

const followError = () =>
  toast.error("Sorry. Error on following this user!", {
    position: "top-center",
  });

const unFollowSuccess = () =>
  toast.success("You unfollow this user", {
    position: "top-center",
  });

const unFollowError = () =>
  toast.error("Sorry. Error on unfollowing this user!", {
    position: "top-center",
  });

const acceptFriendRequestError = () =>
  toast.error("Sorry. Error on accepting Friend Request!", {
    position: "top-center",
  });

const declineFriendRequestError = () =>
  toast.error("Sorry. Error on refusing Friend Request!", {
    position: "top-center",
  });

const CustomViewFriend = ({ data, isRequest = false }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const sendFriendRequest = useSendFriendRequest(["user", "suggest"]);
  const cancelFriendRequest = useCancelFriendRequest(["user", "suggest"], data?.id);
  const sendFollow = useSendFollow(["user", "suggest"]);
  const sendUnfollow = useUnfollowUser(["user", "suggest"]);
  const acceptFriendRequest = useAcceptFriendRequest(["user", "request"]);
  const declineFriendRequest = useDeclineFriendRequest(["user", "request"]);
  const unconnectFriend = useUnfriendUser(["user", "suggest"], data?.id);
  const [isLoading, setLoading] = useState(false);

  const handleFollower = async (_id) => {
    setLoading(true);
    try {
      await sendFollow.mutateAsync({ UserId: _id });
      queryClient.invalidateQueries(["user", "suggest"]);
      followSuccess();
    } catch (e) {
      console.log(e);
      followError();
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollower = async (_id) => {
    setLoading(true);

    try {
      await sendUnfollow.mutateAsync({ id: _id });
      queryClient.invalidateQueries(["user", "suggest"]);
      unFollowSuccess();
    } catch (e) {
      console.log(e);
      unFollowError();
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRequest = async (_id) => {
    setLoading(true);
    try {
      await sendFriendRequest.mutateAsync({ UserID: _id });
      queryClient.invalidateQueries(["user", "suggest"]);
      sendInvitationSuccess();
    } catch (e) {
      console.log(e);
      sendInvitationError();
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFriendRequest = async (_id) => {
    setLoading(true);
    try {
      await cancelFriendRequest.mutateAsync({ UserID: _id });
      queryClient.invalidateQueries(["user", "suggest"]);
      cancelSuccess();
    } catch (e) {
      console.log(e);
      cancelError();
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async (_id) => {
    setLoading(true);
    try {
      await unconnectFriend.mutateAsync({ UserID: _id });
      queryClient.invalidateQueries(["user", "suggest"]);
      cancelSuccess();
    } catch (e) {
      console.log(e);
      cancelError();
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptfriendRequest = async (friendId) => {
    try {
      await acceptFriendRequest.mutateAsync({ friendId, accept: true });
      //add query to fetch
      window.location.reload();
    } catch (e) {
      console.log(e);
      acceptFriendRequestError();
    }
  };

  const handleDeclinefriendRequest = async (friendId) => {
    try {
      await declineFriendRequest.mutateAsync({ friendId, accept: false });
      //add query to fetch
      window.location.reload();
    } catch (e) {
      console.log(e);
      declineFriendRequestError();
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full">
        <div key={data?.id} className="border border-gray-200 p-2 lg:p-4">
          <div className="flex justify-start items-center">
            <div className="mr-3">
              <img
                src={data?.profilePicture?.original || data?.User?.profilePicture || data?.profilePicture}
                alt={"_profilePicture"}
                className="mask mask-squircle w-12 h-12 lg:w-16 lg:h-16"
              />
            </div>
            <div className="text-md">
              <div className="flex items-center justify-between w-full gap-x-6">
                {" "}
                <Link
                  to={`../../profile/${data?.id}`}
                  className="text-[0.95rem] sm:text-md text-primary hover:text-secondary font-semibold"
                >
                  {(data?.firstName || data?.User?.firstName) + " " + (data?.lastName || data?.User?.lastName)}
                </Link>
                <div className="flex justify-end">
                  {user?.id?.toString() === data?.id?.toString() ? (
                    <Link
                      to={`../../profile/${data?.id}`}
                      className="capitalize mb-1 rounded-md sm:rounded-lg px-2 py-1 xs:px-2 md:px-4 md:py-2 text-xs lg:text-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0"
                    >
                      View Profile
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        window.location.href = `../../messages?newMessage=true&otherUserId=${data?.id}`;
                      }}
                      className="capitalize rounded-md sm:rounded-lg px-2 py-1 xs:px-2 md:px-4 md:py-2 text-xs lg:text-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0"
                    >
                      Send Message
                    </button>
                  )}
                </div>
              </div>
              {!isRequest && (
                <div className="flex items-center gap-x-1">
                  <p className=" font-normal text-sm text-gray-400 text-center">
                    {data?.amountOfFollower === 0
                      ? "0 Follower"
                      : data?.amountOfFollower === 1
                      ? data?.amountOfFollower + " Follower"
                      : data?.amountOfFollower + " Followers"}
                  </p>
                  <span className="">•</span>
                  <p className="font-normal text-sm text-gray-400 text-center">
                    {data?.amountOfFollowing === 0
                      ? "0 Following"
                      : data?.amountOfFollowing === 1
                      ? data?.amountOfFollowing + " Following"
                      : data?.amountOfFollowing + " Following"}
                  </p>
                </div>
              )}

              {!isRequest && user?.id !== data?.id && (
                <div className="py-0 lg:py-2 flex items-center justify-start flex-wrap">
                  {!data?.isFriend &&
                    (!data?.hasSentFriendRequest ? (
                      <button
                        onClick={() => {
                          handleFriendRequest(data?.id);
                        }}
                        className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                      >
                        {isLoading ? <Loader /> : "Connect"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleCancelFriendRequest(data?.id);
                        }}
                        className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                      >
                        {isLoading ? <Loader /> : "Cancel Request"}
                      </button>
                    ))}
                  {data?.isFriend && (
                    <button
                      onClick={() => {
                        handleRemoveFriend(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Unconnect"}
                    </button>
                  )}
                  {!data?.iFollow ? (
                    <button
                      onClick={() => {
                        handleFollower(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Follow"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleUnfollower(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Unfollow"}
                    </button>
                  )}
                </div>
              )}

              {/* if request */}
              {isRequest && (
                <div className="">
                  <button
                    onClick={() => {
                      handleAcceptfriendRequest(data?.id);
                    }}
                    className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                  >
                    {isLoading ? <Loader /> : "Accept"}
                  </button>
                  <button
                    onClick={() => {
                      handleDeclinefriendRequest(data?.id);
                    }}
                    className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-0 rounded-lg hover:bg-primary"
                  >
                    {isLoading ? <Loader /> : "Decline"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CustomViewFriend.propTypes = {
  data: PropTypes.array,
  isRequest: PropTypes.bool,
};

export default CustomViewFriend;
