import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
// import { useSendFriendRequest, useAcceptFriendRequest } from "../friendSlice";
import { useSendFriendRequest } from "../friendSlice";

const FriendRequestButton = ({ user, otherUser }) => {
  const [loading, setIsLoading] = useState(false);
  const friendRequestError = () =>
    toast.error("Sorry. Error on sending Friend Request!", {
      position: "top-center",
    });

  /* const acceptFriendRequestError = () =>
    toast.error("Sorry. Error on sending Friend Request!", {
      position: "top-center",
    }); */

  const sendFriendRequest = useSendFriendRequest(["user", "me"], { userId: user?.id, otherUserId: otherUser?.id });
  //   const acceptFriendRequest = useAcceptFriendRequest(["user", "me"], { userId: user?.id, otherUserId: otherUser?.id });

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendFriendRequest.mutateAsync({ UserId: user?.id, OtherUserId: otherUser?.id });
      //add query to fetch
    } catch (e) {
      console.log(e);
      friendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  /*  const handleAcceptFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await acceptFriendRequest.mutateAsync({ UserId: user?.id, OtherUserId: otherUser?.id });
      //add query to fetch
    } catch (e) {
      console.log(e);
      acceptFriendRequestError();
    } finally {
      setIsLoading(false);
    }
  }; */

  return (
    <>
      <Toaster />
      {otherUser ? (
        <button onClick={handleFriendRequest} className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary">
          {loading ? <Loader /> : "Send Friend Request"}
        </button>
      ) : null}

      {/* <button
        onClick={handleAcceptFriendRequest}
        className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary"
      >
        {loading ? <Loader /> : "Accept Friend Request"}
      </button> */}
    </>
  );
};

FriendRequestButton.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default FriendRequestButton;
