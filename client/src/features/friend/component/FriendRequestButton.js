import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { FiUserX, FiUserPlus } from "react-icons/fi";
import { checkFriendRequest, checkFriendList } from "../../../helpers/index";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";
import { useSendFriendRequest, useGetListFriendRequest, useCancelFriendRequest } from "../friendSlice";

const FriendRequestButton = ({ otherUser }) => {
  const [loading, setIsLoading] = useState(false);

  //error dialog
  const friendRequestError = () =>
    toast.error("Sorry. Error on sending Friend Request!", {
      position: "top-center",
    });

  const cancelRequestError = () =>
    toast.error("Sorry. Error on canceling Friend Request!", {
      position: "top-center",
    });

  const { data: listFriendRequest } = useGetListFriendRequest(["user", "request"], true);

  const sendFriendRequest = useSendFriendRequest(["user", "request"]);
  const cancelFriendRequest = useCancelFriendRequest(["user", "request"]);

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendFriendRequest.mutateAsync({ friendId: otherUser?.id });
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
      await cancelFriendRequest.mutateAsync({ friendId: otherUser?.id });
    } catch (e) {
      console.log(e);
      cancelRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {otherUser ? (
        checkFriendList(listFriendRequest?.data?.user?.friends, otherUser?.id) ? null : checkFriendRequest(
            listFriendRequest?.data?.user?.friendsRequest,
            otherUser?.id
          ) ? (
          <AcceptFriendRequestButton otherUser={otherUser} />
        ) : checkFriendRequest(listFriendRequest?.data?.user?.FriendshipRequested, otherUser?.id) ? (
          <button
            onClick={handleCancelFriendRequest}
            className="items-center align-middle mr-2 btn btn-sm btn-secondary text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-primary"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <FiUserX size={"18px"} className="mr-1" />
                {"Cancel Request"}
              </>
            )}
          </button>
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
                {"Send Request"}
              </>
            )}
          </button>
        )
      ) : null}
    </>
  );
};

FriendRequestButton.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default FriendRequestButton;
