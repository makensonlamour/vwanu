import React from "react";
// import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll"; //for infinite scrolling
import { useQueryClient } from "react-query";
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";
import PostList from "../../../features/post/PostList";
import { useGetCommunityPostList } from "../../../features/post/postSlice";
import { useGetCommunity } from "../../../features/community/communitySlice";
import InputModal from "../../../features/post/components/InputModal";
import cryptoRandomString from "crypto-random-string";

const CommunityFeed = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  // const UserId = id;
  const { data: community } = useGetCommunity(["community", id], id !== undefined ? true : false, id);
  const {
    data: list,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetCommunityPostList(["post", "community", id], id !== undefined ? true : false, id);
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
          refetch={() => queryClient.invalidateQueries(["post", "community", id])}
          loader={
            <div className="py-10">
              <Facebook foregroundColor="#000" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["post", "community", id])}>
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
          <button className="" onClick={() => reloadPage(["post", "community", id])}>
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
            <InputModal
              disabled={community?.data?.IsMember === null && !community?.data?.canUserPost ? true : false}
              reference="communityFeed"
              communityId={id}
            />
          </div>
          <div className="lg:flex">
            <div className="w-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityFeed;
