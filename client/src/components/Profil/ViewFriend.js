import React from "react";
// import { useGetListFriend } from "../../features/friend/friendSlice";
import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
// import { checkFriendList } from "../../../helpers/index";
// import FriendButton from "../../features/friend/component/FriendButton";
import { useQueryClient } from "react-query";
import Loader from "../common/Loader";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const ViewFriend = ({ data, noDataLabel, isLoading, isError, hasNextPage, fetchNextPage, arrayQuery }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  // const { data: listFriend } = useGetListFriend(["user", "friend"], true);
  function reloadPage() {
    queryClient.refetchQueries(arrayQuery);
  }

  return (
    <>
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
            classNameContainer={"overflow-y-auto h-[60vh] w-full"}
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
                  return (
                    <div
                      key={friend?.id}
                      className="bg-white w-[100%] sm:w-[49%] md:w-[100%] lg:w-[49%] xl:w-[31%] xl:mx-2 rounded-xl border pt-8 hover:shadow-xl my-3"
                    >
                      <img
                        className="object-cover w-28 h-28 mask mask-squircle mx-auto mb-2"
                        src={friend?.profilePicture?.original || friend?.User?.profilePicture}
                        alt="_profile"
                      />
                      <Link to={`../../profile/${friend?.id}`} className="hover:text-primary">
                        <p className="mx-auto py-3 font-semibold text-lg text-gray-900 text-center">
                          {(friend?.firstName || friend?.User?.firstName) + " " + (friend?.lastName || friend?.User?.lastName)}
                        </p>
                      </Link>
                      <p className="mx-auto font-normal text-sm text-gray-400 text-center">{friend?.createdAt}</p>
                      <p className="mx-auto py-1 font-normal text-sm text-gray-400 text-center">{"14 followers"}</p>
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
                        <div className="flex border border-gray-300 rounded-b-xl -px-6 justify-around bg-placeholder-color">
                          {friend?.isFollowYou ? (
                            <button className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100">Unfollow</button>
                          ) : (
                            <button className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100">Follow</button>
                          )}
                          {friend?.isFriend ? (
                            <button className="basis-1/2 py-3 border-l border-gray-300 hover:bg-gray-100">Unconnect</button>
                          ) : (
                            <button className="basis-1/2 py-3 border-r border-gray-300 hover:bg-gray-100">Connect</button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="flex w-full p-10 mx-auto">{noDataLabel}</div>
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
  fetchNextPage: PropTypes.func,
  arrayQuery: PropTypes.array,
};

export default ViewFriend;
