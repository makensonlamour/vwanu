import React from "react";
// import * as Yup from "yup";
import { useOutletContext, Link } from "react-router-dom";

//RTK Query
// import { useGetPostsQuery } from "../../features/post/postSlice";

//Core components
import Loader from "../../components/common/Loader";
// import { InputField, Form, Submit } from "../../components/form";
// import { FcGallery } from "react-icons/fc";
// import { MdMyLocation, MdOutlineMood } from "react-icons/md";
// import { GoGlobe } from "react-icons/go";
// import PostList from "../../features/post/PostList";
import ProfileHeader from "../../components/Profil/ProfileHeader";

const Profil = () => {
  const user = useOutletContext();

  function reloadPage() {
    window.location.reload();
  }

  const isLoading = false;
  const isSuccess = true;
  const isError = false;

  //generate content post with condition
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    console.log("ok");
    /*
    content = posts?.map((post) => <PostList key={post.id} post={post} />);
    */
  } else if (isError) {
    content = (
      <div className="my-20 m-auto text-center lg:pl-14 lg:pr-12 px-2 lg:px-0">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto px-2">
        <div className="lg:mx-4">
          <ProfileHeader user={user} />
        </div>

        <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div>
      </div>
    </>
  );
};

export default Profil;
