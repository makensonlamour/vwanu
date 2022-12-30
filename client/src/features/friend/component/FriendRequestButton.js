import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { FiUserX, FiUserPlus } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";
import { useSendFriendRequest, useCancelFriendRequest, useUnfriendUser } from "../friendSlice";

const FriendRequestButton = ({ otherUser }) => {
  const [loading, setIsLoading] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  //error dialog
  const friendRequestError = () =>
    toast.error("Sorry. Error on sending Friend Request!", {
      position: "top-center",
    });

  const cancelRequestError = () =>
    toast.error("Sorry. Error on canceling Friend Request!", {
      position: "top-center",
    });

  const unfriendError = () =>
    toast.error("Sorry. Error on Removing Connection!", {
      position: "top-center",
    });

  const sendFriendRequest = useSendFriendRequest(["user", "request"]);
  const cancelFriendRequest = useCancelFriendRequest(["user", "request"], otherUser?.id);
  const unfriend = useUnfriendUser(["user", "friend"], otherUser?.id);

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendFriendRequest.mutateAsync({ UserID: otherUser?.id });
      window.location.reload();
    } catch (e) {
      console.log(e);
      friendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await cancelFriendRequest.mutateAsync({ UserID: otherUser?.id });
      window.location.reload();
    } catch (e) {
      console.log(e);
      cancelRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFriend = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await unfriend.mutateAsync({});
      window.location.reload();
    } catch (e) {
      console.log(e);
      unfriendError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {otherUser &&
        (otherUser?.isFriend ? (
          <button
            onClick={handleRemoveFriend}
            onMouseEnter={() => {
              setIsEnter(true);
            }}
            onMouseLeave={() => {
              setIsEnter(false);
            }}
            className="capitalize items-center align-middle mr-2 btn btn-sm font-[400] text-gray-800 bg-placeholder-color border-0 hover:text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-secondary"
          >
            {loading ? (
              <Loader color="#ff4200" />
            ) : isEnter ? (
              <>
                <FiUserX size={"18px"} className="mr-1" />
                {"Remove connection"}
              </>
            ) : (
              <>
                <AiOutlineCheck size={"18px"} className="mr-1" />
                {"Connected"}
              </>
            )}
          </button>
        ) : otherUser?.hasSentFriendRequest ? (
          <button
            onClick={handleCancelFriendRequest}
            onMouseEnter={() => {
              setIsEnter(true);
            }}
            onMouseLeave={() => {
              setIsEnter(false);
            }}
            className="capitalize items-center align-middle mr-2 btn btn-sm font-[400] text-gray-800 bg-placeholder-color border-0 hover:text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-secondary"
          >
            {loading ? (
              <Loader color="#ff4200" />
            ) : isEnter ? (
              <>
                <FiUserX size={"18px"} className="mr-1" />
                {"Cancel Request"}
              </>
            ) : (
              <>
                <AiOutlineCheck size={"18px"} className="mr-1" />
                {"Request sent"}
              </>
            )}
          </button>
        ) : otherUser?.hasReceivedFriendRequest ? (
          <AcceptFriendRequestButton otherUser={otherUser} />
        ) : (
          <button
            onClick={handleFriendRequest}
            className="items-center align-middle mr-2 btn btn-sm btn-secondary text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-primary"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <FiUserPlus size={"18px"} className="mr-1" />
                {"Connect"}
              </>
            )}
          </button>
        ))}
    </>
  );
};

FriendRequestButton.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default FriendRequestButton;
