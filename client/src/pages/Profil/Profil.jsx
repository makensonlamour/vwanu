import React from "react";
import * as Yup from "yup";

//Core components
import { InputField, Form, Submit } from "../../components/form";
import { FcGallery } from "react-icons/fc";
import { MdMyLocation, MdOutlineMood } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import SinglePost from "../../components/form/Post/SinglePost";
import ProfileHeader from "../../components/Profil/ProfileHeader";

const Profil = () => {
  const ValidationSchema = Yup.object().shape({
    post: Yup.string().min(1).label("Post content"),
  });

  const handleLogin = (dataPost) => console.log(dataPost);

  return (
    <>
      <div className="">
        <ProfileHeader />
        <div className="px-3 pt-10 pb-2 justify-center align-items-center w-[55%]">
          <Form
            validationSchema={ValidationSchema}
            initialValues={{
              post: "",
            }}
            onSubmit={handleLogin}
            className="border-b pb-3 m-2 bg-sky-50"
          >
            <div className="flex flex-wrap -mx-3 pb-3 border-b">
              <img alt="" className="mt-3 w-10 h-10 rounded-full" src="https://i.pravatar.cc/300" />
              <InputField
                required
                autoCapitalize="none"
                placeholder="What's on your mind?"
                name="post"
                className="basis-3/4 appearance-none ml-2 mt-4 text-secondary placeholder:text-gray-600 font-semibold border-none focus:bg-sky-50 active:bg-sky-50"
                testId="post-error-message"
              />
              <Submit data-testid="postBtn" className="ml-4 rounded-full text-md btn-sm inline" title="Post" />
            </div>
            <div className="px-2 lg:px-3 pt-2 pb-2">
              <ul className="flex m-auto list-reset font-bold text-xs">
                <li className="bg-green-200 lg:py-2 lg:px-3 rounded-full mr-4 cursor-pointer hover:bg-green-100">
                  <FcGallery className="inline w-[14px] lg:w-[22px]" /> Photo/Video
                </li>
                <li className="bg-green-200 py-2 px-3 rounded-full mr-4 cursor-pointer hover:bg-green-100">
                  {" "}
                  <MdOutlineMood className="inline w-[14px] lg:w-[22px] text-v-yellow" /> Feeling/Activity
                </li>
                <li className="bg-green-200 py-2 px-3 rounded-full mr-4 cursor-pointer hover:bg-green-100">
                  {" "}
                  <MdMyLocation className="inline w-[14px] lg:w-[22px] text-red-500" /> Check In
                </li>
                <li className="bg-green-200 py-2 px-3 rounded-full mr-4 cursor-pointer hover:bg-green-100">
                  <button className="">
                    {" "}
                    <GoGlobe className="inline w-[14px] lg:w-[22px]" /> Public
                  </button>
                </li>
              </ul>
            </div>
            <div className="ml-auto text-xs"></div>
          </Form>
        </div>
        <SinglePost />
      </div>
    </>
  );
};

export default Profil;
