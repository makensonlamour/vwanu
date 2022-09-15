import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";
// import { TextArea, Submit, Form } from "../../../../components/form";
// import * as Yup from "yup";
import Loader from "../../../../components/common/Loader";
import BoxGif from "../../../../components/common/BoxGif";
import BoxEmoji from "../../../../components/common/BoxEmoji";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif, AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import { MdPhotoSizeSelectActual, MdVideoLibrary } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useCreateConversation, useCreateNewMessage } from "../../messageSlice";
import InputPhoto from "../../../post/components/InputPhoto";
import { useHover } from "@mantine/hooks";

const InputMessage = ({ selectMember, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [selectedGif, setSelectedGif] = useState("");
  const [typeMedia, setTypeMedia] = useState("photo");
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const { hovered, ref } = useHover();

  const inputRef = useRef();
  const buttonRef = useRef();

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji);
    setMessage(message + chosenEmoji?.emoji);
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const createConversation = useCreateConversation(["conversation", "new"], undefined, undefined);
  const sendMessage = useCreateNewMessage(
    type === "new_conversation" ? ["message", "new"] : ["message", selectMember?.id],
    undefined,
    undefined
  );

  const handleOpenGif = (url) => {
    setSelectedGif(url);
    setOpenUploadPhoto(false);
    setOpenUploadVideo(false);
    setFiles([]);
  };

  const handleSubmit = async () => {
    if (message === "" && selectedGif === "" && files.length === 0) return alert("You can't send an empty message");
    setIsLoading(true);
    let formData = new FormData();
    try {
      const arrayGif = [];
      if (selectedGif !== "") {
        arrayGif.push(selectedGif);
      }

      if (files?.length > 0) {
        // eslint-disable-next-line array-callback-return
        files?.map((file) => {
          formData.append("messageImage", file);
        });
        formData.append("messageText", message);
      }
      let dataMessage = {};
      let messageObj = {};

      if (type === "new_conversation") {
        let receiver = selectMember?.map((data) => {
          return data?.id;
        });
        const dataObjConversation = { userIds: receiver };
        let resultConversation = await createConversation.mutateAsync(dataObjConversation);
        if (files?.length > 0) {
          formData.append("ConversationId", resultConversation?.data?.ConversationId);
        } else {
          dataMessage = {
            messageText: message,
            ConversationId: resultConversation?.data?.ConversationId || resultConversation?.data?.id,
          };
        }
        if (selectedGif !== "") {
          dataMessage.mediaLinks = arrayGif;
        }
        await sendMessage.mutateAsync(files?.length > 0 ? formData : dataMessage);
        console.log(resultConversation?.data, resultConversation?.data?.ConversationId || resultConversation?.data?.id);
        window.location.href = `../../messages/${resultConversation?.data?.ConversationId || resultConversation?.data?.id}`;
      } else {
        if (files?.length > 0) {
          formData.append("ConversationId", selectMember?.id);
        } else {
          messageObj = { messageText: message, ConversationId: selectMember?.id };
        }
        if (selectedGif !== "") {
          messageObj.mediaLinks = arrayGif;
        }
        await sendMessage.mutateAsync(files?.length > 0 ? formData : messageObj);
      }
      setSelectedGif("");
      setMessage("");
      setFiles([]);
      setOpenUploadPhoto(false);
      setOpenUploadVideo(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      handleFocus();
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  const handleRemove = (itemToRemove) => {
    setFiles((files) => files.filter((f) => f.name !== itemToRemove.name));
  };

  useEffect(() => {
    handleFocus();
  }, []);

  return (
    <>
      {/* <div className="h-[1px] w-full bg-gray-200"></div> */}
      <div className="z-40">
        <div className="w-full">
          {openUploadPhoto && (
            <div className="flex px-2 lg:px-4 py-1">
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
                      type={typeMedia}
                      fn={setFiles}
                      maxFiles={4}
                    />
                  </div>
                ) : null}
                {files?.length > 0 && (
                  <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                    <>
                      {files?.length < 4 && (
                        <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                          {" "}
                          <InputPhoto
                            files={files}
                            maxFiles={4 - files?.length}
                            label={
                              <Fragment>
                                <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                              </Fragment>
                            }
                            type={typeMedia}
                            fn={setFiles}
                          />
                        </div>
                      )}
                      {files?.map((file) => {
                        return (
                          <div key={file?.preview} className="w-32 relative">
                            <img src={file?.preview} className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle" alt={file?.path} />
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
            <div className="flex px-2 lg:px-4 py-1">
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

          <div className="flex items-start py-0 px-2 bg-placeholder-color rounded-t-lg w-full">
            <div ref={ref} className="flex justify-between text-left py-2 lg:py-2 lg:px-2">
              {hovered ? (
                <>
                  <button
                    onClick={() => {
                      if (selectedGif !== "") {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Are you sure you want to remove the gif?")) {
                          setOpenUploadPhoto(!openUploadPhoto);
                          setOpenUploadVideo(false);
                          setSelectedGif("");
                          setTypeMedia("photo");
                        } else {
                          setOpenUploadPhoto(true);
                          setOpenUploadVideo(false);
                          setSelectedGif("");
                          setTypeMedia("photo");
                        }
                      } else {
                        setOpenUploadPhoto(true);
                        setOpenUploadVideo(false);
                        setSelectedGif("");
                        setTypeMedia("photo");
                      }
                    }}
                    className="hover:text-primary inline-flex justify-center p-2 text-gray-900 rounded-lg cursor-pointer"
                  >
                    <AiOutlineCamera size={"24px"} />
                  </button>
                  <button
                    onClick={() => {
                      if (selectedGif !== "") {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Are you sure you want to remove the gif?")) {
                          setOpenUploadPhoto(false);
                          setOpenUploadVideo(!openUploadVideo);
                          setSelectedGif("");
                          setTypeMedia("video");
                        } else {
                          setOpenUploadPhoto(false);
                          setOpenUploadVideo(!openUploadVideo);
                          setSelectedGif("");
                          setTypeMedia("video");
                        }
                      } else {
                        setOpenUploadPhoto(false);
                        setOpenUploadVideo(!openUploadVideo);
                        setSelectedGif("");
                        setTypeMedia("video");
                      }
                    }}
                    className="inline-flex justify-center py-2 text-gray-900 rounded-lg cursor-pointer hover:text-primary"
                  >
                    <AiOutlineVideoCamera size={"24px"} />
                  </button>
                </>
              ) : (
                <div className="py-2">
                  <ImAttachment size={"21px"} />
                </div>
              )}
              <BoxGif label={<AiOutlineGif size={"24px"} />} setSelectedGif={handleOpenGif} />
              <BoxEmoji label={<BsEmojiSmile size={"21px"} />} setSelectedEmoji={onEmojiClick} />
            </div>
            <div className="w-full py-2">
              <TextareaAutosize
                ref={inputRef}
                autoCapitalize="none"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={1}
                maxRows={5}
                style={{ width: "100%" }}
                onKeyDown={onEnterPress}
                name="message"
                type="text"
                className="resize-none outline-0 align-middle block py-2 px-2 mx-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="py-3 lg:py-1">
              <button
                ref={buttonRef}
                onClick={() => {
                  handleSubmit();
                }}
                className="my-1 px-4 lg:px-6 lg:py-2 w-fit rounded-xl text-md"
              >
                {isLoading ? <Loader color="primary" /> : <AiOutlineSend size={"24px"} className="hover:hover:text-primary" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

InputMessage.propTypes = {
  selectMember: PropTypes.object,
  type: PropTypes.string,
};

export default InputMessage;
