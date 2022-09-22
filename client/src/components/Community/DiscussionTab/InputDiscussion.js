import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
// import _ from "lodash";
//import FormPost from "../FormPost";
import { useOutletContext } from "react-router-dom";
import { InputField, SubmitPost, Field, Form } from "../../../components/form";
//import { FcGallery } from "react-icons/fc";
// import { MdAlternateEmail } from "react-icons/md";
// import { RiHashtag } from "react-icons/ri";
// import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
// import ModalPrivacy from "../../../components/common/ModalPrivacy";
// import { Popover } from "@mui/material";
import { useCreateDiscussion } from "../../../features/forum/forumSlice";
// import Picker from "emoji-picker-react";
// import InputPhoto from "./InputPhoto";
// import Editor from "../../../components/form/Post/InputField/Editor.js";
import Loader from "./../../common/Loader";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Post created successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on creating post!", {
    position: "top-center",
  });

const InputDiscussion = ({ communityId, labelBtn, data = {}, type = "new" }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [openUploadGif, setOpenUploadGif] = useState(false);
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
    try {
      const dataObj = {
        body: credentials.postText,
        title: credentials.postTitle,
      };

      if (type === "new") {
        dataObj.CommunityId = communityId?.id;
      } else {
        dataObj.DiscussionId = data?.id;
      }

      let result = await mutationAdd.mutateAsync(dataObj);
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
                        placeholder="Discussion Title"
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
                      placeholder={`Type your discussion content here`}
                      name="postText"
                      className="basis-full text-lg appearance-none text-secondary placeholder:text-gray-600 font-light border-none "
                      testId="post-error-message"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="rounded-b-lg border-t border-solid border-gray-300 bg-placeholder-color px-4">
                  <div className="flex font-semibold text-sm justify-between items-center">
                    <div className=" text-left py-4 px-4">
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
};

export default InputDiscussion;
