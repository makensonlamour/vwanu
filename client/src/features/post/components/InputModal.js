/* eslint-disable */
import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
//import FormPost from "../FormPost";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Form } from "../../../components/form";
//import { FcGallery } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import { RiHashtag } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import ModalPrivacy from "../../../components/common/ModalPrivacy";
import { Popover } from "@mui/material";
import { useCreatePost } from "../postSlice";
import Picker from "emoji-picker-react";
import InputPhoto from "./InputPhoto";
// import Editor from "../../../components/form/Post/InputField/Editor.js";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Post created successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on creating post!", {
    position: "top-center",
  });

const InputModal = ({ reference }) => {
  const user = useOutletContext();
  const UserId = user?.id;
  const [showModal, setShowModal] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [openUploadGif, setOpenUploadGif] = useState(false);
  // const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
  const [privacyText, setPrivacyText] = useState("public");
  const [hashTag, setHashTag] = useState(false);
  const [image, setImage] = useState(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [textEditor, setTextEditor] = useState(null);
  const [files, setFiles] = useState([]);
  const [blobFile, setBlobFile] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //Dialog functions
  const handleClickOpen = () => {
    setOpenPrivacy(true);
  };

  //Formik initial value and yup validation
  const initialValues = {
    postText: "",
    postImage: "",
    UserId,
  };

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().min(1).label("Post Text"),
    postImage: Yup.mixed().label("Image"),
  });

  //const [createPost, { isSuccess }] = useCreatePostMutation();
  console.log(files);
  const mutationAdd = useCreatePost(["post", "home"], (oldData, newData) => [...oldData, newData]);

  let formData = new FormData();
  const handleSubmit = async (credentials) => {
    if (files?.length) {
      files?.map((file) => {
        formData.append("postImage", file);
      });
    }
    formData.append("postText", credentials.postText);
    formData.append("UserId", credentials.UserId);
    formData.append("privacyType", privacyText);

    //request for post newsfeed
    if (_.isEqual(reference, "newsfeed")) {
      try {
        await mutationAdd.mutateAsync(formData);
        postSuccess();
        // reloadPage();
      } catch (e) {
        console.log(e);
        postError();
      }
      setImage(null);
      setShowModal(false);
      setFiles([]);
      setBlobFile([]);
      //request for post profile
    } else if (_.isEqual(reference, "profilefeed")) {
      try {
        await mutationAdd.mutateAsync(formData);
        postSuccess();
      } catch (e) {
        console.log(e);
        postError();
      }
      setShowModal(false);

      //request for post group
    } else if (_.isEqual(reference, "groupfeed")) {
      try {
        await mutationAdd.mutateAsync(formData);
        postSuccess();
      } catch (e) {
        console.log(e);
      }
      setShowModal(false);
      //request for post pages
    } else if (_.isEqual(reference, "pagefeed")) {
      try {
        await mutationAdd.mutateAsync(formData);
        postSuccess();
      } catch (e) {
        console.log(e);
        postError();
      }
      setShowModal(false);
    } else setShowModal(false);
  };

  return (
    <>
      <Toaster />
      <button
        onClick={() => setShowModal(true)}
        className="rounded-lg bg-white border border-gray-300 pt-4 w-full hover:bg-placeholder-color"
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
        <div className="border-t border-gray-300 bg-placeholder-color text-left py-4 px-4">
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
                      className="basis-full text-lg appearance-none text-secondary placeholder:text-gray-600 font-light border-none "
                      testId="post-error-message"
                      hashtagSymbol={hashTag}
                    />
                  </div>
                  <div>{/* add photo */}</div>
                  <div>{/* add video */}</div>
                  <div>{/* add gif */}</div>
                  <div className="flex">
                    <span className="ml-auto">
                      <button onClick={() => setHashTag(true)} className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <RiHashtag size={20} className="inline mr-1" />
                      </button>
                      <button className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50">
                        {" "}
                        <MdAlternateEmail size={20} className="inline mr-1" />
                      </button>
                      <button
                        type="button"
                        onClick={handleClick}
                        aria-describedby={id}
                        className="text-right px-3 py-1 lg:mt-0 cursor-pointer hover:bg-gray-50"
                      >
                        <BsEmojiSmile size={20} className="inline mr-1" />
                      </button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        onMouseDown={handleClose}
                        onMouseLeave={handleClose}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                      >
                        <Picker onEmojiClick={onEmojiClick} />
                      </Popover>
                    </span>
                  </div>
                  {openUploadPhoto && (
                    <div className="flex">
                      <div className="w-full">
                        {files?.length === 0 ? (
                          <div className="flex items-center justify-center mt-2 bg-gray-300 m-1 w-full h-36 rounded-xl">
                            <InputPhoto fn={setFiles} maxFiles={4} />
                          </div>
                        ) : null}
                        {files?.length > 0 && (
                          <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                            <>
                              <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                                {" "}
                                <InputPhoto fn={setFiles} />
                              </div>
                              {files?.map((file) => {
                                return (
                                  <img
                                    src={file?.preview}
                                    className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle"
                                    alt={file?.path}
                                  />
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
                      {/*}  <p className="inline-flex pr-4 -pt-10">
                        <InputImage
                          label=""
                          name="postImage"
                          id="img"
                          stateFile={setImage}
                          accept="image/png,image/jpg,image/jpeg"
                          icon={<AiOutlineCamera size="24px" className="text-gray-800 inline -pt-10" />}
                          autoComplete="new-file"
                          className="text-secondary font-semibold rounded-full px-6 input-primary -pt-10 border-none w-1/2 ml-auto hidden pr-2"
                        />
                    </p> {*/}
                      <button
                        onClick={() => {
                          setOpenUploadPhoto(!openUploadPhoto);
                          setOpenUploadVideo(false);
                          setOpenUploadGif(false);
                        }}
                        className="mr-4"
                      >
                        <AiOutlineCamera size={"24px"} />
                      </button>
                      <button
                        onClick={() => {
                          setOpenUploadVideo(!openUploadVideo);
                          setOpenUploadGif(false);
                          setOpenUploadPhoto(false);
                        }}
                        className="mr-4"
                      >
                        <AiOutlineVideoCamera size={"24px"} />
                      </button>
                      <button
                        onClick={() => {
                          setOpenUploadGif(!openUploadGif);
                          setOpenUploadPhoto(false);
                          setOpenUploadVideo(false);
                        }}
                        className="mr-4"
                      >
                        <AiOutlineGif size={"24px"} />
                      </button>
                    </div>
                    {/*}
                    <div>
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
                    {*/}
                    <div>
                      <SubmitPost
                        title="Post"
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
};

export default InputModal;
