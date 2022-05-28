import React from "react";
// import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";

//Core components

import PostList from "../../features/post/PostList";
import { useGetPostsList } from "../../features/post/postSlice";
import InputModal from "../../features/post/components/InputModal";

const ProfileFeed = () => {
  const { id } = useParams();
  const UserId = id;

  const { data: list, isLoading, fetchNextPage, hasNextPage, isError } = useGetPostsList(["post", "profile"], UserId);

  function reloadPage() {
    window.location.reload();
  }

  let content;
  if (isLoading) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (list?.pages?.length > 0) {
    content = (
      <>
        <InfiniteScroll
          /* next is the function for fetching data from backend when the user reaches the end */
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loader={<Facebook />}
          isReverse={true}
          pageStart={0}
        >
          {list?.pages.map((page) => {
            return page?.data?.map((post) => {
              return <PostList key={post.id} post={post} pageTitle={""} />;
            });
          })}
        </InfiniteScroll>
        <div className="w-full mt-6 mb-6 mx-auto text-center">
          <button className="" onClick={() => reloadPage()}>
            <FiRefreshCcw className="h-7 mx-auto" />
          </button>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-20 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-md">
        <Facebook />
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
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
            <InputModal reference="profilefeed" />
          </div>
          <div className="lg:flex">
            <div className="w-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ProfileFeed.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
}; */

export default ProfileFeed;
