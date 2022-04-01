import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"; //for infinite scrolling
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";

//Core components

import PostList from "../../features/post/PostList";
import InputModal from "../../features/post/components/InputModal";

//RTK Query
import { usePrefetch, useGetPostsQuery } from "../../features/post/postSlice";

const NewsFeed = () => {
  const dataUser = useOutletContext();
  const UserId = dataUser?.user?.id;
  const [posts, setPosts] = useState([]);
  const LIMIT = 10;

  //Initial posts fetch
  const { data, isFetching, isSuccess, isError } = useGetPostsQuery({
    UserId: UserId,
    pageSize: LIMIT,
    pageNumber: 0,
  });

  const [hasMore, setHasMore] = useState(true); //means if there is more data to fetch frm backend, then it'll be true
  const [pageNumber, setPageNumber] = useState(1); //we set it to 1 initially because from getInitialProps below, posts of pageNumber 0 have already been fetched. So now, it's set to pageNumber 1 for next pagination call

  const fetchDataOnScroll = async () => {
    try {
      prefetchPage({ UserId: UserId, pageSize: LIMIT, pageNumber: pageNumber });
      if (data?.data?.count === posts.length) {
        setHasMore(false); //for stopping function call (inside of InfinitScroll component) after all posts have been fetched
      }

      //if more posts are there
      setPosts((prev) => [...prev, ...data.data.posts]);
      setPageNumber((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };

  //To add post data to useState
  useEffect(() => {
    if (posts?.length === 0) {
      setPosts(data?.data?.posts || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const prefetchPage = usePrefetch("getPosts", { force: true });

  function reloadPage() {
    window.location.reload();
  }

  let content;
  if (isFetching) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (isSuccess && posts?.length > 0) {
    content = (
      <InfiniteScroll
        /* next is the function for fetching data from backend when the user reaches the end */
        hasMore={hasMore}
        next={fetchDataOnScroll}
        loader={<Facebook />}
        endMessage={
          <div className="w-full mt-6 mb-6 mx-auto text-center">
            <button className="" onClick={() => reloadPage()}>
              <FiRefreshCcw className="h-7 mx-auto" />
            </button>
          </div>
        }
        dataLength={posts.length}
        // end message is the component which will get displayed when no more posts to be fetched from backend
      >
        {posts?.map((post) => (
          <PostList key={post.id} post={post} pageTitle={""} />
        ))}
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
            <div className="hidden lg:inline mx-2 rounded-2xl basis-1/3 border"></div>
          </div>
          <div className="lg:flex">
            <div className="w-full lg:basis-2/3">{content}</div>
            <div className="hidden lg:inline mx-2 rounded-2xl border lg:basis-1/3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
