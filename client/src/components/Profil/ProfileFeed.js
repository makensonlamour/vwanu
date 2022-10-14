import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";
import cryptoRandomString from "crypto-random-string";

//Core components

import PostList from "../../features/post/PostList";
import { useGetPostsList } from "../../features/post/postSlice";
import InputModal from "../../features/post/components/InputModal";

const ProfileFeed = ({ otherUser }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const UserId = id;

  const {
    data: list,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetPostsList(["post", "profile"], UserId !== undefined ? true : false, UserId);

  function reloadPage(arrayQueryKey) {
    // window.location.reload();
    queryClient.refetchQueries(arrayQueryKey);
  }

  let content;
  if (isLoading) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (isError) {
    content = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"There was an error while fetching the data. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Tap to retry
        </Link>{" "}
      </div>
    );
  } else if (list?.pages?.length > 0 && list?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["post", "profile"])}
          loader={
            <div className="py-10">
              <Facebook foregroundColor="#000" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["post", "profile"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
          noDataRender={
            <div className="flex justify-center py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">
              <p>{"No more post. "}</p>
              <p className="font-semibold hover:text-primary cursor-pointer">{"Back to top ^"}</p>
            </div>
          }
        >
          {list?.pages.map((page) => {
            // totalItems = page?.length;
            return page?.data?.data?.map((post) => {
              return (
                <div key={cryptoRandomString({ length: 10 })}>
                  <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />
                </div>
              );
            });
          })}
        </InfiniteScroll>

        <div className="w-full mt-6 mb-6 mx-auto text-center">
          <button className="" onClick={() => reloadPage(["post", "home"])}>
            <FiRefreshCcw className="h-7 mx-auto" />
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <div className="py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">{"No posts "} </div>
    );
  }

  return (
    <>
      <div className="mx-auto">
        <div className="pb-2 mx-auto align-items-center lg:w-full space-y-2">
          <div className="lg:basis-2/3">
            <InputModal reference="profilefeed" otherUser={otherUser} />
          </div>
          <div className="lg:flex">
            <div className="w-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

ProfileFeed.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default ProfileFeed;
