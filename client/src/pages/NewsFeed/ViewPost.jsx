import React from "react";
import { Link, useParams } from "react-router-dom";
import { Facebook } from "react-content-loader";
import { useGetPost } from "../../features/post/postSlice";
import Loader from "../../components/common/Loader";
import PostList from "../../features/post/PostList";

const ViewPost = () => {
  const { id } = useParams();
  // const user = useOutletContext();
  // const UserId = user?.id;
  // console.log(UserId, id);

  const { data: post, isSuccess, isError, isFetching } = useGetPost(["post", id], true, id);

  function reloadPage() {
    window.location.reload();
  }

  console.log(post);

  let content;
  if (isFetching) {
    content = <Loader />;
  } else if (isSuccess && post) {
    content = <PostList pageTitle={"post"} post={post?.data} />;
  } else if (isError) {
    content = (
      <div className="my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-md">
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
      <div className="basis-full mx-auto z-30">
        <div className="mx-auto py-2 align-items-center w-full space-y-2">
          <div className="lg:pr-2 lg:flex">
            <div className="w-full basis-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
