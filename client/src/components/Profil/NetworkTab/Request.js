import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useGetListFriendReceive } from "../../../features/friend/friendSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";
import Loader from "../../common/Loader";
import InfiniteScroll from "../../InfiniteScroll/InfiniteScroll";
import CustomViewFriend from "../CustomViewFriend";

// eslint-disable-next-line no-unused-vars
const Friends = () => {
  const queryClient = useQueryClient();
  const { data: listFriendReceive, isError, isLoading, hasNextPage, fetchNextPage } = useGetListFriendReceive(["user", "received"], true);

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
          ) : listFriendReceive && listFriendReceive?.pages?.length > 0 && listFriendReceive?.pages[0]?.data?.total > 0 ? (
            <InfiniteScroll
              fetchMore={fetchNextPage}
              isError={isError}
              isLoading={isLoading}
              hasNext={hasNextPage}
              refetch={() => queryClient.invalidateQueries(["user", "received"])}
              container={true}
              classNameContainer={"overflow-y-auto h-fit scrollbar max-h-[60vh] w-full"}
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
              <div className="flex flex-wrap lg:justify-between xl:justify-start py-2 w-full">
                {listFriendReceive?.pages?.map((page) => {
                  return page?.data?.data?.map((friend) => {
                    return <CustomViewFriend isRequest={true} key={friend?.id} data={friend} />;
                  });
                })}
              </div>
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
