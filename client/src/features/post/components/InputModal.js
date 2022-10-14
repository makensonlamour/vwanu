/*eslint-disable*/
import React, { useState, Fragment } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import { useQueryClient } from "react-query";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Form } from "../../../components/form";
import { MdPhotoSizeSelectActual, MdVideoLibrary } from "react-icons/md";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif, AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import ModalPrivacy from "../../../components/common/ModalPrivacy";
import Loader from "../../../components/common/Loader";
import { useCreatePost } from "../postSlice";
import InputPhoto from "./InputPhoto";
import BoxGif from "../../../components/common/BoxGif";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Post created successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on creating post!", {
    position: "top-center",
  });

const InputModal = ({ reference, communityId, disabled = false, otherUser }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const UserId = user?.id;
  const [showModal, setShowModal] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [privacyText, setPrivacyText] = useState("public");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGif, setSelectedGif] = useState("");
  const [type, setType] = useState("photo");

  const handleOpenGif = (url) => {
    setSelectedGif(url);
    setOpenUploadPhoto(false);
    setOpenUploadVideo(false);
    setFiles([]);
  };

  //Dialog functions
  const handleClickOpen = () => {
    setOpenPrivacy(true);
  };

  //Formik initial value and yup validation
  const initialValues = {
    postText: "",
    postImage: "",
    postVideo: "",
    UserId,
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
    postImage: Yup.mixed().label("Image"),
  });

  const mutationAdd = useCreatePost(["post", "home"], (oldData, newData) => [...oldData, newData]);

  let formData = new FormData();
  const handleSubmit = async (credentials) => {
    if (credentials?.postText === "" && selectedGif === "" && files.length < 1) return alert("The post can't be empty.");
    setLoading(true);
    try {
      if (files?.length) {
        if (type === "photo") {
          files?.map((file) => {
            formData.append("postImage", file);
          });
        } else {
          files?.map((file) => {
            formData.append("postVideo", file);
          });
        }
      }
      let dataObj = {};
      if (selectedGif !== "") {
        const arrayGif = [];
        arrayGif.push(selectedGif);
        dataObj = {
          postText: credentials.postText,
          UserId: credentials.UserId,
          privacyType: privacyText,
          mediaLinks: arrayGif,
        };
      }

      //request for post newsfeed
      if (_.isEqual(reference, "newsfeed")) {
        formData.append("postText", credentials.postText);
        formData.append("UserId", credentials.UserId);
        formData.append("privacyType", privacyText);
        try {
          await mutationAdd.mutateAsync(selectedGif !== "" ? dataObj : formData);
          postSuccess();
          setShowModal(false);
          setFiles([]);
          setSelectedGif("");
          setOpenUploadPhoto(false);
          setOpenUploadVideo(false);
          // reloadPage();
        } catch (e) {
          console.log(e);
          postError();
        }
        setShowModal(false);
        setFiles([]);
        setSelectedGif("");
        setOpenUploadPhoto(false);
        setOpenUploadVideo(false);
        queryClient.invalidateQueries(["post", "home"]);
        //request for post profile
      } else if (_.isEqual(reference, "profilefeed")) {
        formData.append("postText", credentials.postText);
        formData.append("UserId", credentials.UserId);
        formData.append("privacyType", privacyText);
        if (otherUser && otherUser?.id) {
          dataObj.wallId = otherUser?.id;
          formData.append("wallId", otherUser?.id);
        }
        try {
          await mutationAdd.mutateAsync(selectedGif !== "" ? dataObj : formData);
          postSuccess();
          setShowModal(false);
          setFiles([]);
          setSelectedGif("");
          setOpenUploadPhoto(false);
          setOpenUploadVideo(false);
        } catch (e) {
          console.log(e);
          postError();
        }
        setShowModal(false);

        //request for post group
      } else if (_.isEqual(reference, "communityFeed")) {
        formData.append("postText", credentials.postText);
        formData.append("CommunityId", communityId);
        try {
          await mutationAdd.mutateAsync(selectedGif !== "" ? dataObj : formData);
          postSuccess();
          setShowModal(false);
          setFiles([]);
          setSelectedGif("");
          setOpenUploadPhoto(false);
          setOpenUploadVideo(false);
        } catch (e) {
          console.log(e);
        }
        setShowModal(false);
        //request for post pages
      } else if (_.isEqual(reference, "pagefeed")) {
        try {
          await mutationAdd.mutateAsync(selectedGif !== "" ? dataObj : formData);
          postSuccess();
          setShowModal(false);
          setFiles([]);
          setSelectedGif("");
          setOpenUploadPhoto(false);
          setOpenUploadVideo(false);
        } catch (e) {
          console.log(e);
          postError();
        }
        setShowModal(false);
      } else setShowModal(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (itemToRemove) => {
    setFiles((files) => files.filter((f) => f.name !== itemToRemove.name));
  };

  return (
    <>
      <Toaster />
      <div
        onClick={() => setShowModal(true)}
        className={`${
          disabled ? "hidden" : ""
        } cursor-pointer rounded-lg bg-white border border-gray-300 pt-4 w-full hover:bg-placeholder-color`}
      >
        <div className="flex items-center px-4 pb-4">
          {" "}
          <Link className="w-14 h-14 mx-auto " to={"../profile/" + user?.id}>
            {" "}
            <img
              alt=""
              className="object-cover object-center flex-start justify-center align-center mx-auto w-14 h-14 mask mask-squircle"
              src={user?.profilePicture?.original}
            />{" "}
          </Link>
          <p className="flex-end text-left pl-2 p-2 ml-4 rounded-2xl text-md font-light text-gray-600 w-full">
            {`Share what's on your mind, ${user?.firstName}...`}
          </p>
        </div>
        <div className="border-t rounded-b-lg border-gray-300 bg-placeholder-color text-left py-4 px-4">
          <button className="mr-4">
            <AiOutlineCamera size={"24px"} />
          </button>
          <button className="mr-4">
            <AiOutlineVideoCamera size={"24px"} />
          </button>
          <button className="mr-4">
            <AiOutlineGif size={"24px"} />
          </button>
        </div>
      </div>

      {showModal ? (
        <>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-md lg:max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
                  <p className="text-lg font-medium">Create a Post</p>
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

                  {openUploadPhoto && (
                    <div className="flex">
                      <div className="w-full">
                        {files?.length === 0 ? (
                          <div className="flex items-center justify-center mt-2 bg-gray-300 m-1 w-full h-36 rounded-xl">
                            <InputPhoto
                              files={files}
                              label={
                                <Fragment>
                                  <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                  <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                  <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                </Fragment>
                              }
                              type={type}
                              fn={setFiles}
                              maxFiles={10}
                            />
                          </div>
                        ) : null}
                        {files?.length > 0 && (
                          <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                            <>
                              {files?.length < 10 && (
                                <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                                  {" "}
                                  <InputPhoto
                                    files={files}
                                    maxFiles={10 - files?.length}
                                    label={
                                      <Fragment>
                                        <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                        <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                        <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                      </Fragment>
                                    }
                                    type={type}
                                    fn={setFiles}
                                  />
                                </div>
                              )}
                              {files?.length === 1 &&
                                files?.map((file) => {
                                  return (
                                    <div key={file?.preview} className="w-32 relative">
                                      <img src={file?.preview} className="object-fit bg-gray-300 m-1 w-full h-52" alt={file?.path} />
                                      <button
                                        onClick={() => handleRemove(file)}
                                        className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
                                      >
                                        <AiOutlineDelete size={"24px"} className="" />
                                      </button>
                                    </div>
                                  );
                                })}
                              {files?.length >= 2 &&
                                files?.length < 10 &&
                                files?.map((file) => {
                                  return (
                                    <div key={file?.preview} className="w-32 relative">
                                      <img
                                        src={file?.preview}
                                        className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle"
                                        alt={file?.path}
                                      />
                                      <button
                                        onClick={() => handleRemove(file)}
                                        className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
                                      >
                                        <AiOutlineDelete size={"24px"} className="" />
                                      </button>
                                    </div>
                                  );
                                })}
                            </>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {openUploadVideo && (
                    <div className="flex">
                      <div className="w-full">
                        {files?.length === 0 ? (
                          <div className="flex items-center justify-center mt-2 bg-gray-300 m-1 w-full h-36 rounded-xl">
                            <InputPhoto
                              label={
                                <Fragment>
                                  <MdVideoLibrary size={"28px"} className="text-center mx-auto" />
                                  <p className="text-center text-md font-semibold">{"Add Video"}</p>
                                  <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                </Fragment>
                              }
                              type={type}
                              fn={setFiles}
                              maxFiles={1}
                            />
                          </div>
                        ) : null}
                        {files?.length > 0 && (
                          <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                            <>
                              {files?.length < 1 && (
                                <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                                  <InputPhoto
                                    label={
                                      <Fragment>
                                        <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                        <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                        <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                      </Fragment>
                                    }
                                    type={type}
                                    fn={setFiles}
                                  />
                                </div>
                              )}
                              {files?.map((file) => {
                                return (
                                  <div key={file?.preview} className="w-32 relative">
                                    <div>
                                      <video className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle" controls alt={file?.path}>
                                        <source alt={file?.path} src={file?.preview} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    </div>
                                    <button
                                      onClick={() => handleRemove(file)}
                                      className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
                                    >
                                      <AiOutlineDelete size={"24px"} className="" />
                                    </button>
                                  </div>
                                );
                              })}
                            </>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedGif && (
                    <div className="">
                      <img src={selectedGif} className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle" alt={"_gif"} />
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="rounded-b-lg border-t border-solid border-gray-300 bg-placeholder-color px-4">
                  <div className="flex font-semibold text-sm justify-between items-center">
                    <div className=" text-left py-4 px-4">
                      <button
                        onClick={() => {
                          setOpenUploadPhoto(!openUploadPhoto);
                          setType("photo");
                          setOpenUploadVideo(false);
                          setFiles([]);
                          setSelectedGif("");
                        }}
                        className="mr-4"
                      >
                        <AiOutlineCamera size={"24px"} />
                      </button>
                      <button
                        onClick={() => {
                          setOpenUploadVideo(!openUploadVideo);
                          setType("video");
                          setOpenUploadPhoto(false);
                          setFiles([]);
                          setSelectedGif("");
                        }}
                        className="mr-4"
                      >
                        <AiOutlineVideoCamera size={"24px"} />
                      </button>
                      <BoxGif setSelectedGif={handleOpenGif} label={<AiOutlineGif size={"24px"} />} />
                    </div>

                    <div>
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
      ) : null}
    </>
  );
};

InputModal.propTypes = {
  reference: PropTypes.string.isRequired,
  communityId: PropTypes.string,
  otherUser: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputModal;
