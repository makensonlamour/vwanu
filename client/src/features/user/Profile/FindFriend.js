import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useSendFriendRequest, useCancelFriendRequest } from "../../../features/friend/friendSlice";
import { useSendFollow } from "../../../features/follower/followerSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
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

const FindFriend = ({ data }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const sendFriendRequest = useSendFriendRequest(["user", "suggest"]);
  const cancelFriendRequest = useCancelFriendRequest(["user", "suggest"], data?.id);
  const sendFollow = useSendFollow(["user", "suggest"]);
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

  return (
    <>
      <Toaster />
      {data?.id !== user?.id && (
        <div className="w-full">
          <div key={data?.id} className="border border-gray-200 p-2 lg:p-4">
            <div className="flex justify-start items-center">
              <div className="mr-3">
                <img
                  src={data?.profilePicture?.original}
                  alt={"_profilePicture"}
                  className="mask mask-squircle w-12 h-12 lg:w-16 lg:h-16"
                />
              </div>
              <div className="text-md">
                <p className="">{data?.firstName + " " + data?.lastName}</p>
                <div className="py-1 lg:py-2 flex justify-start flex-wrap">
                  {user?.id !== data?.id && !data?.hasSentFriendRequest ? (
                    <button
                      onClick={() => {
                        handleFriendRequest(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Connect"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleCancelFriendRequest(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Cancel Friend Request"}
                    </button>
                  )}
                  {user?.id !== data?.id && !data?.iFollow ? (
                    <button
                      onClick={() => {
                        handleFollower(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Follow"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleFollower(data?.id);
                      }}
                      className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-1 my-1 rounded-lg hover:bg-primary"
                    >
                      {isLoading ? <Loader /> : "Unfollow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

FindFriend.propTypes = {
  data: PropTypes.object.isRequired,
  isCreator: PropTypes.bool,
};

export default FindFriend;
