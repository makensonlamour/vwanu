import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { useGetListFriendReceive, useAcceptFriendRequest, useDeclineFriendRequest } from "../../../features/friend/friendSlice";
import { Badge } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

// import AcceptFriendRequestButton from "../../../features/friend/component/AcceptFriendRequestButton";

// import routesPath from "../../../routesPath";

const FriendsPreview = () => {
  const { data: listFriendReceive } = useGetListFriendReceive(["user", "received"], true);
  const acceptFriendRequest = useAcceptFriendRequest(["user", "request"]);
  const declineFriendRequest = useDeclineFriendRequest(["user", "request"]);
  const [friendReceiveNumber, setFriendReceiveNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculateLength = () => {
    if (listFriendReceive && listFriendReceive?.pages?.length > 0) {
      // eslint-disable-next-line array-callback-return
      let total = listFriendReceive?.pages[0]?.data?.total;
      setFriendReceiveNumber(total);
    }
  };

  const acceptFriendRequestError = () =>
    toast.error("Sorry. Error on accepting Friend Request!", {
      position: "top-center",
    });

  const declineFriendRequestError = () =>
    toast.error("Sorry. Error on refusing Friend Request!", {
      position: "top-center",
    });

  const handleAcceptfriendRequest = async (friendId) => {
    // e.preventDefault();
    setIsLoading(true);
    try {
      await acceptFriendRequest.mutateAsync({ friendId, accept: true });
      //add query to fetch
      window.location.reload();
    } catch (e) {
      console.log(e);
      acceptFriendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclinefriendRequest = async (friendId) => {
    // e.preventDefault();
    setIsLoading(true);
    try {
      await declineFriendRequest.mutateAsync({ friendId, accept: false });
      //add query to fetch
      window.location.reload();
    } catch (e) {
      console.log(e);
      declineFriendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFriendReceive]);

  return (
    <>
      <Toaster />
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={friendReceiveNumber} color="primary" className="">
            <AiOutlineUserAdd size={"24px"} />
          </Badge>
        </label>
        <ul
          tabIndex="2"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[90vw] sm:w-96 text-gray-900 overflow-auto scrollbar h-fit max-h-96"
        >
          {console.log(listFriendReceive)}
          {listFriendReceive &&
          listFriendReceive?.pages &&
          listFriendReceive?.pages?.length > 0 &&
          listFriendReceive?.pages[0]?.data?.total > 0 ? (
            <li>
              {listFriendReceive?.pages?.map((page, idx) => {
                return page?.data?.data?.map((friend) => {
                  return (
                    <Link key={idx} to={"/profile/" + friend?.id} className="text-base border-b hover:bg-placeholder-color rounded-xl">
                      <div className="flex items-center align-middle justify-between w-full">
                        <div className="flex items-center justify-start">
                          <div className="w-12">
                            <img className="object-cover w-8 h-8 mask mask-squircle" src={friend?.profilePicture?.original} alt="" />
                          </div>
                          <div className="text-secondary text-sm w-[75%] line-clamp-1">{friend?.firstName + " " + friend?.lastName}</div>
                        </div>
                        <div className="">
                          <button
                            onClick={() => handleAcceptfriendRequest(friend?.id)}
                            // to={"/profile/" + friend?.id}
                            className="capitalize text-xs items-right align-middle mr-1 text-white bg-secondary rounded-lg px-2 py-1 mb-2 lg:mb-0 hover:bg-primary"
                          >
                            {isLoading ? "Loading..." : "Accept"}
                          </button>
                          <button
                            onClick={() => handleDeclinefriendRequest(friend?.id)}
                            // to={"/profile/" + friend?.id}
                            className="capitalize text-xs items-right align-middle text-white bg-secondary rounded-lg px-2 py-1 mb-2 lg:mb-0 hover:bg-primary"
                          >
                            {isLoading ? "Loading..." : "Decline"}
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                });
              })}
            </li>
          ) : (
            <>
              <div className="w-full text-green-500 font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> No Friend request</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default FriendsPreview;
