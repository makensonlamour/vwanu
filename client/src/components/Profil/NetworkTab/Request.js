import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useGetListFriendReceive } from "../../../features/friend/friendSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";
import Loader from "../../common/Loader";
import InfiniteScroll from "../../InfiniteScroll/InfiniteScroll";

const Friends = ({ fn, isNetwork = false }) => {
  const queryClient = useQueryClient();
  const { data: listFriendReceive, isError, isLoading, hasNextPage, fetchNextPage } = useGetListFriendReceive(["user", "received"], true);

  fn(listFriendReceive?.length || 0);

  function reloadPage() {
    queryClient.refetchQueries(["user", "received"]);
  }

  return (
    <>
      <div className="my-2">
        <div className="flex flex-wrap lg:justify-between xl:justify-start py-2">
          {isLoading ? (
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          ) : isError ? (
            <div className="py-5 m-auto text-center px-2 lg:px-2">
              {"There was an error while fetching the data. "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "received"])}>
                Tap to retry
              </Link>
            </div>
          ) : listFriendReceive?.pages?.length > 0 && listFriendReceive?.pages[0]?.data?.total > 0 ? (
            <InfiniteScroll
              fetchMore={fetchNextPage}
              isError={isError}
              isLoading={isLoading}
              hasNext={hasNextPage}
              refetch={() => queryClient.invalidateQueries(["user", "received"])}
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
                  <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "received"])}>
                    Tap to retry
                  </Link>{" "}
                </div>
              }
            >
              {listFriendReceive?.pages?.map((page) => {
                return page?.data?.data?.map((friend) => {
                  return (
                    <div
                      key={friend?.id}
                      className={`bg-white border-gray-200 w-[100%] sm:w-[49%] md:w-[100%] lg:w-[49%] xl:mx-2 rounded-xl border pt-8 hover:shadow-xl my-3 
                        ${isNetwork ? " xl:w-[48%] " : " xl:w-[31%] "}
                      `}
                    >
                      <img
                        className="object-cover w-28 h-28 mask mask-squircle mx-auto mb-2"
                        src={friend?.profilePicture?.original}
                        alt="_profile"
                      />
                      <p className="mx-auto py-3 font-semibold text-lg text-gray-900 text-center">
                        {friend?.firstName + " " + friend?.lastName}
                      </p>
                      <p className="mx-auto font-normal text-sm text-gray-400 text-center">{"Joined Apr 2022"}</p>
                      <p className="mx-auto py-1 font-normal text-sm text-gray-400 text-center">{"14 followers"}</p>
                      <div className="px-4">
                        <button className="capitalize mt-4 mb-8 rounded-xl px-3 btn btn-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0">
                          Send Message
                        </button>
                      </div>
                      <div className="flex border border-gray-300 rounded-b-xl -px-6 justify-around bg-placeholder-color">
                        <button className="basis-1/2 py-3 border-r border-gray-300 hover:text-primary hover:bg-gray-100">Follow</button>
                        <button className="basis-1/2 py-3 border-l border-gray-300 hover:text-primary hover:bg-gray-100">Connect</button>
                      </div>
                    </div>
                  );
                });
              })}
            </InfiniteScroll>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyComponent
                border={false}
                icon={<ImSad size={"32px"} className="" />}
                placeholder={"Sorry, You don't have any pending request."}
                tips={""}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Friends.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
  isNetwork: PropTypes.bool,
};

export default Friends;
