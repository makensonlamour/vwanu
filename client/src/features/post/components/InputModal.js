import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import _ from "lodash";
//import FormPost from "../FormPost";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Form } from "../../../components/form";
//import { FcGallery } from "react-icons/fc";
//import { MdMyLocation, MdOutlineMood } from "react-icons/md";
//import { GoGlobe } from "react-icons/go";

//RTK Query
import { useCreatePostMutation } from "../../post/postSlice";

const InputModal = ({ reference }) => {
  const dataUser = useOutletContext();
  const UserId = dataUser?.user?.id;
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    postText: "",
    UserId,
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
  });

  const [createPost, { isSuccess }] = useCreatePostMutation();

  const handleSubmit = async (credentials) => {
    //request for post newsfeed
    if (_.isEqual(reference, "newsfeed")) {
      try {
        await createPost(credentials).unwrap();
      } catch (e) {
        console.log(e);
      }
      setShowModal(false);
      //request for post profile
    } else if (_.isEqual(reference, "profile")) {
      try {
        await createPost(credentials).unwrap();
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
            <div className="relative w-auto my-6 mx-auto max-w-sm lg:max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 border border-secondary hover:bg-secondary hover:text-base-100 active:bg-secondary active:text-base-100 rounded-full w-8 h-8 text-black float-left text-lg leading-none font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
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
                  <div className="border-b">
                    <InputField
                      required
                      autoCapitalize="none"
                      placeholder="What's on your mind? #hashtag, @mention or link"
                      name="postText"
                      className="basis-full appearance-none ml-2 text-secondary placeholder:text-gray-600 font-semibold border-none "
                      testId="post-error-message"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <div className="px-3">
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
                </div>*/}
                  {/*   <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
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
