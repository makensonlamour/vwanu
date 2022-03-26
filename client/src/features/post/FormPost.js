import React from "react";
import * as Yup from "yup";
import { InputField, Form } from "../../components/form";
//import { FcGallery } from "react-icons/fc";
//import { MdMyLocation, MdOutlineMood } from "react-icons/md";
//import { GoGlobe } from "react-icons/go";

const FormPost = () => {
  const ValidationSchema = Yup.object().shape({
    post: Yup.string().min(1).label("Post content"),
  });

  const handleLogin = (dataPost) => console.log(dataPost);

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          post: "",
        }}
        onSubmit={handleLogin}
        className="m-2"
      >
        <div className="border-b">
          <InputField
            required
            autoCapitalize="none"
            placeholder="What's on your mind?"
            name="post"
            className="basis-full appearance-none ml-2 text-secondary placeholder:text-gray-600 font-semibold border-none "
            testId="post-error-message"
          />
          {/*   <Submit data-testid="postBtn" className="lg:ml-4 rounded-full text-md btn-sm inline ml-auto" title="Post" /> */}
        </div>
        {/*
        <div className="px-3 pt-2 pb-2">
          <ul className="flex m-auto list-reset font-bold text-xs overflow-x-auto lg:overflow-hidden pb-4 lg:pb:0">
            <li className="flex bg-green-200 py-2 px-3 mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
              <FcGallery size={22} className="inline mr-2" /> Photo/Video
            </li>
            <li className="flex bg-green-200 py-2 px-3 mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
              {" "}
              <MdOutlineMood size={22} className="inline mr-2 text-v-yellow" /> Feeling/Activity
            </li>
            <li className="flex bg-green-200 py-2 px-3 mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
              {" "}
              <MdMyLocation size={22} className="inline mr-2 text-red-500" /> Location
            </li>
            <li className="">
              <button className="flex bg-green-200 py-2 px-3 mt-4 lg:mt-0 mr-4 cursor-pointer hover:bg-green-100">
                {" "}
                <GoGlobe size={22} className="inline mr-2" /> Public
              </button>
            </li>
          </ul>
        </div> */}
        <div className="ml-auto text-xs"></div>
      </Form>
    </>
  );
};

export default FormPost;
