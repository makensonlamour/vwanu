import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

//Core components
import Loader from "../../components/common/Loader";
import { InputField, Form, Submit } from "../../components/form";
import { FcGallery } from "react-icons/fc";
import { MdMyLocation, MdOutlineMood } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import PostList from "../../features/post/PostList";

//RTK Query
import { useGetPostsQuery } from "../../features/api/apiSlice";

const NewsFeed = () => {
  const { data: posts, isLoading, isSuccess, isError } = useGetPostsQuery();
  const ValidationSchema = Yup.object().shape({
    post: Yup.string().min(1).label("Post content"),
  });

  function reloadPage() {
    window.location.reload();
  }

  const handleLogin = (dataPost) => console.log(dataPost);

  //generate content post with condition
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = posts?.map((post) => <PostList key={post.id} post={post} />);
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
      <div className="mx-auto px-2 md:px-14 lg:px-10">
        <div className="lg:pl-14 lg:pr-8 pt-10 pb-2 justify-center align-items-center lg:w-full">
          <Form
            validationSchema={ValidationSchema}
            initialValues={{
              post: "",
            }}
            onSubmit={handleLogin}
            className="border-b pb-3 m-2 bg-sky-50"
          >
            <div className="flex flex-wrap -mx-3 pb-3 border-b">
              <img alt="" className="mt-3 w-10 h-10 rounded-full inline" src="https://i.pravatar.cc/300" />
              <InputField
                required
                autoCapitalize="none"
                placeholder="What's on your mind?"
                name="post"
                className="inline basis-3/4 appearance-none ml-2 mt-4 text-secondary placeholder:text-gray-600 font-semibold border-none focus:bg-sky-50 active:bg-sky-50"
                testId="post-error-message"
              />
              <Submit data-testid="postBtn" className="lg:ml-4 rounded-full text-md btn-sm inline ml-auto" title="Post" />
            </div>
            <div className="px-3 pt-2 pb-2">
              <ul className="flex m-auto list-reset font-bold text-xs overflow-x-auto lg:overflow-hidden pb-4 lg:pb:0">
                <li className="flex bg-green-200 py-2 px-3 rounded-full mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
                  <FcGallery size={22} className="inline mr-2" /> Photo/Video
                </li>
                <li className="flex bg-green-200 py-2 px-3 rounded-full mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
                  {" "}
                  <MdOutlineMood size={22} className="inline mr-2 text-v-yellow" /> Feeling/Activity
                </li>
                <li className="flex bg-green-200 py-2 px-3 rounded-full mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
                  {" "}
                  <MdMyLocation size={22} className="inline mr-2 text-red-500" /> Location
                </li>
                <li className="">
                  <button className="flex bg-green-200 py-2 px-3 rounded-full mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
                    {" "}
                    <GoGlobe size={22} className="inline mr-2" /> Public
                  </button>
                </li>
              </ul>
            </div>
            <div className="ml-auto text-xs"></div>
          </Form>
        </div>
        <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div>
      </div>
    </>
  );
};

export default NewsFeed;
