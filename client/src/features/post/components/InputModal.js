import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import _ from "lodash";
//import FormPost from "../FormPost";
import { useOutletContext } from "react-router-dom";
import { InputField, InputImage, SubmitPost, Form } from "../../../components/form";
//import { FcGallery } from "react-icons/fc";
import { MdMyLocation, MdAlternateEmail } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { RiHashtag, RiImageAddFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";

//RTK Query
import { useCreatePostMutation } from "../../post/postSlice";

const InputModal = ({ reference }) => {
  const dataUser = useOutletContext();
  const UserId = dataUser?.user?.id;
  const [showModal, setShowModal] = useState(false);
  const [hashTag, setHashTag] = useState(false);
  const [image, setImage] = useState(null);

  const initialValues = {
    postText: "",
    postImage: "",
    UserId,
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
    postImage: Yup.mixed().label("Image"),
  });

  const [createPost, { isSuccess }] = useCreatePostMutation();

  let formData = new FormData();
  const handleSubmit = async (credentials) => {
    formData.append("postImage", image);
    formData.append("postText", credentials.postText);
    formData.append("UserId", credentials.UserId);
    //const obj = { UserId: credentials.UserId, postText: credentials.postText, postImage: formData };

    //request for post newsfeed
    if (_.isEqual(reference, "newsfeed")) {
      try {
        console.log(formData);
        await createPost(formData).unwrap();
      } catch (e) {
        console.log(e);
      }
      setImage(null);
      setShowModal(false);
      //request for post profile
    } else if (_.isEqual(reference, "profile")) {
      try {
        await createPost(formData).unwrap();
      } catch (e) {
        console.log(e);
      }
      if (isSuccess) {
        setShowModal(false);
      }
      //request for post group
    } else if (_.isEqual(reference, "group")) {
      try {
        await createPost(credentials).unwrap();
      } catch (e) {
        console.log(e);
      }
      if (isSuccess) {
        setShowModal(false);
      }
      //request for post pages
    } else if (_.isEqual(reference, "pages")) {
      try {
        await createPost(credentials).unwrap();
      } catch (e) {
        console.log(e);
      }
      if (isSuccess) {
        setShowModal(false);
      }
    } else setShowModal(false);
  };

  return (
    <>
      <div className="flex rounded-2xl shadow-sm border p-4">
        {" "}
        <img alt="" className="flex-start justify-center align-center w-10 h-10 rounded-full" src={dataUser?.user?.profilePicture} />
        <button className="flex-end text-left pl-2 p-2 ml-4 rounded-2xl bg-sky-50 text-sm text-gray-600" onClick={() => setShowModal(true)}>
          {`What's on your mind? #hashtag, @mention or link`}
        </button>
      </div>
      {showModal ? (
        <>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-md lg:max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 hover:bg-secondary hover:text-base-100 active:bg-secondary active:text-base-100 rounded-full w-8 h-8 text-black float-left text-lg leading-none font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="">X</span>
                  </button>
                  <SubmitPost
                    title="Publish"
                    className="bg-secondary py-2 px-4 rounded-lg ml-auto border-0 text-base-100 float-right text-md leading-none font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
                  />
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <div className="">
                    <InputField
                      required
                      autoCapitalize="none"
                      placeholder="What's on your mind? #hashtag, @mention or link"
                      name="postText"
                      className="basis-full appearance-none text-secondary placeholder:text-gray-600 font-semibold border-none "
                      testId="post-error-message"
                      hashtagSymbol={hashTag}
                    />
                  </div>
                  <div className="flex">
                    <span>
                      <button className="px-3 py-1 lg:mt-0 mr-4 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <GoGlobe size={20} className="inline mr-1" /> Everyone
                      </button>
                    </span>
                    <span className="ml-auto">
                      <button onClick={() => setHashTag(true)} className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <RiHashtag size={20} className="inline mr-1" />
                      </button>
                      <button className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <MdAlternateEmail size={20} className="inline mr-1" />
                      </button>
                      <button className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <BsEmojiSmile size={20} className="inline mr-1" />
                      </button>
                    </span>
                  </div>
                  <div className="flex mt-2">
                    {image ? <img src={URL.createObjectURL(image)} className="bg-gray-300 m-1 w-20 h-20 rounded-lg" alt="_image" /> : null}
                  </div>
                </div>
                {/*footer*/}
                <div className="border-t border-solid border-blueGray-200 rounded-b">
                  <div className="flex font-semibold text-sm ">
                    <span className="inline float-left text-left rounded-lg mx-2 py-1 px-2 my-2 basis-full bg-gray-200 hover:bg-gray-50">
                      <InputImage
                        label="Upload Photo"
                        name="postImage"
                        id="img"
                        stateFile={setImage}
                        accept="image/png,image/jpg,image/jpeg"
                        icon={<RiImageAddFill size="22px" className="text-gray-800 inline" />}
                        autoComplete="new-file"
                        className="text-secondary font-semibold rounded-full px-6 input-primary border-none w-1/2 ml-auto hidden"
                      />
                    </span>
                    <span className="float-right text-left rounded-lg mx-2 my-2 basis-full py-1 px-2 bg-gray-200 hover:bg-gray-50">
                      <MdMyLocation size={22} className="inline mr-2 text-red-500" /> Location
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

InputModal.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default InputModal;
