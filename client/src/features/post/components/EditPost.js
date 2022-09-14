/*eslint-disable*/
import React, { useState, Fragment } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
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
import { VscEdit } from "react-icons/vsc";
// import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

//Functions for notification after actions
const postSuccess = () =>
  toast.success("Post created successfully!", {
    position: "top-center",
  });

const postError = () =>
  toast.error("Sorry. Error on creating post!", {
    position: "top-center",
  });

const EditPost = ({ reference, communityId, setOpenDialogEdit, openDialogEdit }) => {
  const user = useOutletContext();
  const UserId = user?.id;
  const [privacyText, setPrivacyText] = useState("public");
  const [selectedGif, setSelectedGif] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenDialogEdit(false);
  };

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

  const handleSubmit = async (credentials) => {
    if (credentials?.postText === "") return alert("The post can't be empty.");
    setLoading(true);
    try {
      let dataObj = {};

      //request for post newsfeed
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
      //request for post profile
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   const [privacyText, setPrivacyText] = useState("public");
  //   const [selectedGif, setSelectedGif] = useState("");
  //   const [showModal, setShowModal] = useState(false);
  //   const [openPrivacy, setOpenPrivacy] = useState(false);
  //   const [loading, setLoading] = useState(false);

  //   //Formik initial value and yup validation
  //   const initialValues = {
  //     postText: "",
  //     postImage: "",
  //     postVideo: "",
  //     UserId,
  //   };

  //   const ValidationSchema = Yup.object().shape({
  //     postText: Yup.string().min(1).label("Post Text"),
  //     postImage: Yup.mixed().label("Image"),
  //   });

  //   const mutationAdd = useCreatePost(["post", "home"], (oldData, newData) => [...oldData, newData]);

  //   let formData = new FormData();
  //   const handleSubmit = async (credentials) => {
  //     if (credentials?.postText === "") return alert("The post can't be empty.");
  //     setLoading(true);
  //     try {
  //       let dataObj = {};

  //       //request for post newsfeed
  //       formData.append("postText", credentials.postText);
  //       formData.append("UserId", credentials.UserId);
  //       formData.append("privacyType", privacyText);
  //       try {
  //         await mutationAdd.mutateAsync(selectedGif !== "" ? dataObj : formData);
  //         postSuccess();
  //         setShowModal(false);
  //         setFiles([]);
  //         setSelectedGif("");
  //         setOpenUploadPhoto(false);
  //         setOpenUploadVideo(false);
  //         // reloadPage();
  //       } catch (e) {
  //         console.log(e);
  //         postError();
  //       }
  //       setShowModal(false);
  //       setFiles([]);
  //       setSelectedGif("");
  //       setOpenUploadPhoto(false);
  //       setOpenUploadVideo(false);
  //       //request for post profile
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      <Toaster />
      <Fragment>
        <Dialog
          open={openDialogEdit}
          handler={() => setOpenDialogEdit(!openDialogEdit)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader id="customized-dialog-title" onClose={handleClose}>
            Edit Post
          </DialogHeader>
          <DialogBody dividers></DialogBody>
          <DialogFooter>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
      {/* <div onClick={() => setShowModal(true)} className="flex">
        <VscEdit size={"18px"} className="mr-1 items-center align-middle inline" />
        Edit Post
      </div>

      {showModal ? (
        <>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-md lg:max-w-2xl">
              {/*content}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header}
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
                  <p className="text-lg font-medium">Create a Post</p>
                  <button onClick={() => setShowModal(false)} className="text-lg font-medium">
                    x
                  </button>
                </div>
                {/*body}
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
                    {/*<Editor fn={setTextEditor} placeholder={`Share what's on your mind, ${user?.firstName}...`} />}

                    <InputField
                      required
                      autoCapitalize="none"
                      placeholder={`Share what's on your mind, ${user?.firstName}...`}
                      name="postText"
                      className="basis-full text-lg appearance-none text-secondary placeholder:text-gray-600 font-light border-none "
                      testId="post-error-message"
                    />
                  </div>

                  {/*footer}
                  <div className="rounded-b-lg border-t border-solid border-gray-300 bg-placeholder-color px-4">
                    <div className="flex font-semibold text-sm justify-between items-center">
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
            </div>
          </Form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}
    </>
  );
};

EditPost.propTypes = {
  reference: PropTypes.string.isRequired,
  communityId: PropTypes.string,
  setOpenDialogEdit: PropTypes.func,
  openDialogEdit: PropTypes.bool,
};

export default EditPost;
