import React, { useState, useEffect, Fragment } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Form } from "../../../components/form";
import toast, { Toaster } from "react-hot-toast";
import ModalPrivacy from "../../../components/common/ModalPrivacy";
import Loader from "../../../components/common/Loader";
import { useUpdatePost } from "../postSlice";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Post edited successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on editing post!", {
    position: "top-center",
  });

const EditPost = ({ setShowModal, post }) => {
  const user = useOutletContext();
  const UserId = user?.id;
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [privacyText, setPrivacyText] = useState("public");
  const [loading, setLoading] = useState(false);

  //Dialog functions
  const handleClickOpen = () => {
    setOpenPrivacy(true);
  };

  //Formik initial value and yup validation
  const initialValues = {
    postText: post?.postText,
    UserId,
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
    postImage: Yup.mixed().label("Image"),
  });

  const mutationUpdate = useUpdatePost(["post", "home"], (oldData, newData) => [...oldData, newData]);

  const handleSubmit = async (credentials) => {
    if (credentials?.postText === "") return alert("The post can't be empty.");
    setLoading(true);
    try {
      let dataObj = { postText: credentials.postText, id: post?.id, privacyType: privacyText };
      try {
        await mutationUpdate.mutateAsync(dataObj);
        postSuccess();
        setShowModal(false);
        // reloadPage();
      } catch (e) {
        console.log(e);
        postError();
      }
      setShowModal(false);
      //request for post profile
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(post).length !== 0) {
      setPrivacyText(post?.privacyType);
    }
  }, [post]);

  return (
    <>
      <Toaster />
      <>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none"
        >
          <div className="relative w-full my-6 mx-auto max-w-md lg:max-w-2xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
                <p className="text-lg font-medium">Edit Post</p>
                <button onClick={() => setShowModal(false)} className="text-lg font-medium">
                  x
                </button>
              </div>
              {/*body*/}
              <div className="relative p-3">
                <div className="px-3 flex">
                  <div>
                    <Link to={"../profile/" + user?.id}>
                      {" "}
                      <img
                        alt=""
                        className="object-cover object-center flex-start justify-center align-center w-12 h-12 mask mask-squircle"
                        src={user?.profilePicture?.original}
                      />{" "}
                    </Link>
                  </div>
                  <div className="px-2">
                    <p className="font-medium pl-2">{user?.firstName}</p>
                    <button
                      onClick={() => {
                        handleClickOpen();
                      }}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <ModalPrivacy title={privacyText} open={openPrivacy} fn={setPrivacyText} />
                    </button>
                  </div>
                </div>
                <div className="flex-auto">
                  {/*<Editor fn={setTextEditor} placeholder={`Share what's on your mind, ${user?.firstName}...`} />*/}

                  <InputField
                    required
                    autoCapitalize="none"
                    placeholder={`Share what's on your mind, ${user?.firstName}...`}
                    name="postText"
                    className="mt-3 basis-full text-lg appearance-none text-secondary placeholder:text-gray-600 font-light border-none "
                    testId="post-error-message"
                  />
                </div>
              </div>
              {/*footer*/}
              <div className="rounded-b-lg border-t border-solid border-gray-300 bg-placeholder-color px-4">
                <div className="flex font-semibold text-sm justify-end items-center">
                  <div className="flex justify-end py-2">
                    <SubmitPost
                      title={loading ? <Loader /> : "Post"}
                      disabled={loading ? true : false}
                      className="bg-primary hover:bg-secondary py-3 px-5 rounded-lg  border-0 text-base-100 float-right text-md leading-none font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

EditPost.propTypes = {
  post: PropTypes.object,
  setShowModal: PropTypes.func,
};

export default EditPost;
