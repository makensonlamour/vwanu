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
                  return <CustomViewFriend key={friend?.id} data={friend} />;
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
