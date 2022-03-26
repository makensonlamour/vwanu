import React from "react";
import { useOutletContext, Link } from "react-router-dom";

//Core components
import Loader from "../../components/common/Loader";
import PostList from "../../features/post/PostList";
import InputModal from "../../features/post/components/InputModal";

//RTK Query
import { useGetPostsQuery } from "../../features/post/postSlice";

const NewsFeed = () => {
  const dataUser = useOutletContext();
  const obj = {
    UserId: dataUser?.user?.id,
    pageSize: 6,
    pageNumber: 0,
  };

  const { data, isLoading, isSuccess, isError } = useGetPostsQuery(obj);

  function reloadPage() {
    window.location.reload();
  }

  //generate content post with condition
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess && data?.data?.posts?.length > 0) {
    content = data?.data?.posts?.map((post) => <PostList key={post.id} post={post} />);
  } else if (isError) {
    content = (
      <div className="my-20 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    content = <div className="my-20 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0">{"No posts "} </div>;
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
