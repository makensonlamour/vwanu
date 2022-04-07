import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"; //for infinite scrolling
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";

//Core components

import PostList from "../../features/post/PostList";
import { useGetPostsList } from "../../features/post/postSlice";
import InputModal from "../../features/post/components/InputModal";

const NewsFeed = () => {
  const user = useOutletContext();
  const UserId = user?.id;

  const { data: list, isLoading, fetchNextPage, hasNextPage, isError } = useGetPostsList({ UserId });

  function reloadPage() {
    window.location.reload();
  }

  let content;
  if (isLoading) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (list?.pages?.length > 0) {
    content = (
      <InfiniteScroll
        /* next is the function for fetching data from backend when the user reaches the end */
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<Facebook />}
        endMessage={
          <div className="w-full mt-6 mb-6 mx-auto text-center">
            <button className="" onClick={() => reloadPage()}>
              <FiRefreshCcw className="h-7 mx-auto" />
            </button>
          </div>
        } //end message is the component which will get displayed when no more posts to be fetched from backend
        dataLength={10}
        pullDownToRefresh
        pullDownToRefreshThreshold={100}
        pullDownToRefreshContent={
          <h3 className="w-52 text-center mx-auto rounded-full bg-primary py-2 my-2 text-base-100 text-sm normal-case">
            &#8595; Pull down to load new post
          </h3>
        }
        releaseToRefreshContent={
          <h3 className="w-52 text-center mx-auto rounded-full bg-secondary py-2 my-2 text-base-100 text-sm normal-case">
            &#8593; Release to load new post
          </h3>
        }
        refreshFunction={() => reloadPage()}
      >
        {list?.pages.map((page) => {
          return page?.data?.posts?.map((post) => {
            return <PostList key={post.id} post={post} pageTitle={""} />;
          });
        })}
      </InfiniteScroll>
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
      <div className="mx-auto z-30">
        <div className="pt-10 pb-2 mx-auto align-items-center lg:w-full space-y-2">
          <div className="lg:flex">
            <InputModal reference="newsfeed" />
            <div className="hidden lg:inline mx-2 rounded-2xl basis-1/3 border bg-white"></div>
          </div>
          <div className="lg:flex">
            <div className="w-full lg:basis-2/3">{content}</div>
            <div className="hidden lg:inline mx-2 rounded-2xl border lg:basis-1/3 bg-white"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
