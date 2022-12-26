import React, { useState, Fragment } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
// import _ from "lodash";
//import FormPost from "../FormPost";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Field, Form } from "../../../components/form";
//import { FcGallery } from "react-icons/fc";
import { MdPhotoSizeSelectActual, MdVideoLibrary } from "react-icons/md";
// import { RiHashtag } from "react-icons/ri";
// import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
// import ModalPrivacy from "../../../components/common/ModalPrivacy";
// import { Popover } from "@mui/material";
import { useCreateDiscussion } from "../../../features/forum/forumSlice";
// import Picker from "emoji-picker-react";
import InputPhoto from "../../../features/post/components/InputPhoto";
// import Editor from "../../../components/form/Post/InputField/Editor.js";
import Loader from "./../../common/Loader";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Discussion created successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on creating discussion!", {
    position: "top-center",
  });

const InputDiscussion = ({ communityId, labelBtn, data = {}, type = "new", isForum = true, CategoryId = "" }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const [openPrivacy, setOpenPrivacy] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [typeF, setTypeF] = useState("photo");
  // const [openUploadGif, setOpenUploadGif] = useState(false);
  // const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
  //   const [privacyText, setPrivacyText] = useState("public");
  // const [hashTag, setHashTag] = useState(false);
  //   const [image, setImage] = useState(null);
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  // const [anchorEl, setAnchorEl] = useState(null);

  // const onEmojiClick = (event, emojiObject) => {
  //   setChosenEmoji(emojiObject);
  //   console.log(chosenEmoji);
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  //Formik initial value and yup validation
  const initialValues = {
    postText: "",
    postImage: "",
    postTitle: Object.keys(data).length > 0 ? data?.title : "",
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
    postImage: Yup.mixed().label("Image"),
  });

  const mutationAdd = useCreateDiscussion(["community", "discussion", "create"], (oldData, newData) => [...oldData, newData]);

  const handleSubmit = async (credentials) => {
    setLoading(true);
    let formData = new FormData();
    try {
      const dataObj = {
        body: credentials.postText,
        title: credentials.postTitle,
      };

      if (files?.length) {
        formData.append("body", credentials.postText);
        formData.append("title", credentials.postTitle);
      }
      if (files?.length) {
        if (typeF === "photo") {
          files?.map((file) => {
            formData.append("discussionImage", file);
          });
        } else {
          files?.map((file) => {
            formData.append("discussionVideo", file);
          });
        }
      }
      if (type === "new") {
        if (isForum) {
          dataObj.CategoryId = CategoryId;
          formData.append("CategoryId", CategoryId);
        } else {
          dataObj.CommunityId = communityId?.id;
          formData.append("CommunityId", communityId?.id);
        }
      } else {
        dataObj.DiscussionId = data?.id;
        formData.append("DiscussionId", data?.id);
      }

      let result = await mutationAdd.mutateAsync(files?.length > 0 ? formData : dataObj);
      console.log(result);
      postSuccess();
      queryClient.invalidateQueries(["community", "reply", data?.id]);
      window.location.reload();
    } catch (e) {
      console.log(e);
      postError();
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const handleRemove = (itemToRemove) => {
    setFiles((files) => files.filter((f) => f.name !== itemToRemove.name));
  };

  return (
    <>
      <Toaster />
      <button
        onClick={() => setShowModal(true)}
        className={`${
          type === "new"
            ? "bg-primary text-white lg:py-2 py-1 lg:px-6 px-2 w-fit border border-gray-200 rounded-lg ml-2"
            : "text-white px-4 lg:px-8 py-1 lg:py-2 border border-gray-200 rounded-lg mr-2 w-fit lg:w-48 hover:text-white bg-primary"
        }`}
      >
        {labelBtn}
      </button>

      {showModal ? (
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
                  <div className={`flex justify-start items-center basis-[80%]`}>
                    {type === "new" ? (
                      <Link to={"../profile/" + user?.id}>
                        {" "}
                        <img
                          alt=""
                          className="object-cover object-center flex-start justify-center align-center w-12 h-12 mask mask-squircle"
                          src={user?.profilePicture?.original}
                        />{" "}
                      </Link>
                    ) : (
                      <p className="font-semibold w-[20%] align-middle">Replied To:</p>
                    )}
                    <div className="basis-full ml-4">
                      <Field
                        disabled={type === "new" ? false : true}
                        name="postTitle"
                        type="text"
                        placeholder="Ask your questions here"
                        className="mt-4 w-full border-none text-lg focus:shadow-lg placeholder:text-gray-600 font-light"
                      />
                    </div>
                  </div>

                  <button onClick={() => setShowModal(false)} className="text-lg font-medium">
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3">
                  <div className="flex-auto">
                    <InputField
                      required
                      autoCapitalize="none"
                      placeholder={`Write the context or your opinion about this questions here.`}
                      name="postText"
                      className="basis-full text-lg appearance-none text-secondary placeholder:text-gray-600 font-light border-none "
                      testId="post-error-message"
                    />
                  </div>
                  {/* for photos and videos */}
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
                              type={typeF}
                              fn={setFiles}
                              maxFiles={1}
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
                                    maxFiles={1 - files?.length}
                                    label={
                                      <Fragment>
                                        <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                        <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                        <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                      </Fragment>
                                    }
                                    type={typeF}
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
                              type={typeF}
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
                                    type={typeF}
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
                </div>
                {/*footer*/}
                <div className="rounded-b-lg border-t border-solid border-gray-300 bg-placeholder-color px-4">
                  <div className="flex font-semibold text-sm justify-between items-center">
                    <div className=" text-left py-4 px-4">
                      <button
                        onClick={() => {
                          setOpenUploadPhoto(!openUploadPhoto);
                          setOpenUploadVideo(false);
                          setTypeF("photo");
                          // setOpenUploadGif(false);
                        }}
                        className="mr-4"
                      >
                        <AiOutlineCamera size={"24px"} />
                      </button>
                      <button
                        onClick={() => {
                          setOpenUploadVideo(!openUploadVideo);
                          // setOpenUploadGif(false);
                          setOpenUploadPhoto(false);
                          setTypeF("video");
                        }}
                        className="mr-4"
                      >
                        <AiOutlineVideoCamera size={"24px"} />
                      </button>
                      {/* <button
                        onClick={() => {
                          setOpenUploadGif(!openUploadGif);
                          setOpenUploadPhoto(false);
                          setOpenUploadVideo(false);
                        }}
                        className="mr-4"
                      >
                        <AiOutlineGif size={"24px"} />
                      </button> */}
                    </div>

                    <div>
                      <SubmitPost
                        title={loading ? <Loader /> : "Post"}
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

InputDiscussion.propTypes = {
  reference: PropTypes.string.isRequired,
  communityId: PropTypes.string,
  labelBtn: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object,
  isForum: PropTypes.bool,
  CategoryId: PropTypes.string,
};

export default InputDiscussion;
