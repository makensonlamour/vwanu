import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { TextArea, Submit, Form } from "../../../../components/form";
import * as Yup from "yup";
import Loader from "../../../../components/common/Loader";
import BoxGif from "../../../../components/common/BoxGif";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif, AiOutlineDelete } from "react-icons/ai";
import { MdPhotoSizeSelectActual, MdVideoLibrary } from "react-icons/md";
import { useCreateConversation, useCreateNewMessage } from "../../messageSlice";
import InputPhoto from "../../../post/components/InputPhoto";

const InputMessage = ({ selectMember, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [focus, setFocus] = useState(true);
  const [selectedGif, setSelectedGif] = useState("");
  const [typeMedia, setTypeMedia] = useState("photo");

  let initialValues = {
    message: "",
  };

  const ValidationSchema = Yup.object().shape({
    message: Yup.string().label("Community Name"),
  });

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

  const handleSubmit = async (data) => {
    if (data?.message === "" && selectedGif === "" && files.length === 0) return alert("You can't send an empty message");
    setIsLoading(true);
    setFocus(false);
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
        formData.append("messageText", data?.message);
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
          formData.append("ConversationId", resultConversation?.data?.id);
        } else {
          dataMessage = { messageText: data?.message, ConversationId: resultConversation?.data?.id };
        }
        if (selectedGif !== "") {
          dataMessage.mediaLinks = arrayGif;
        }
        await sendMessage.mutateAsync(files?.length > 0 ? formData : dataMessage);
        window.location.href = `../../messages/${resultConversation?.data?.id}`;
      } else {
        if (files?.length > 0) {
          formData.append("ConversationId", selectMember?.id);
        } else {
          messageObj = { messageText: data?.message, ConversationId: selectMember?.id };
        }
        if (selectedGif !== "") {
          messageObj.mediaLinks = arrayGif;
        }
        await sendMessage.mutateAsync(files?.length > 0 ? formData : messageObj);
      }
      setSelectedGif("");
      data.message = "";
      setFiles([]);
      setOpenUploadPhoto(false);
      setOpenUploadVideo(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setFocus(true);
    }
  };

  const handleRemove = (itemToRemove) => {
    setFiles((files) => files.filter((f) => f.name !== itemToRemove.name));
  };

  return (
    <>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="bg-white z-40">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
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
          <TextArea
            autofocus={focus}
            disableUnderline={true}
            autoCapitalize="none"
            placeholder="Type message"
            name="message"
            type="text"
            maxRows={4}
            minRows={1}
            style={{ width: "100%", border: "none" }}
            sx={{
              input: {
                border: "none",
              },
            }}
            className="appearance-none mb-1 p-2 outline-0 text-secondary placeholder:text-gray-300 focus:border-0 rounded-2xl border-0"
          />
          <div className="px-2 flex justify-between border-gray-300 bg-placeholder-color">
            <div className="flex justify-between border-t text-left py-2 lg:py-4 lg:px-4">
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
                className="mr-4"
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
                className="mr-4"
              >
                <AiOutlineVideoCamera size={"24px"} />
              </button>

              <BoxGif label={<AiOutlineGif size={"24px"} />} setSelectedGif={handleOpenGif} />
            </div>
            <Submit className="my-1 px-4 lg:px-6 lg:py-2 w-fit lg:w-full rounded-xl text-md" title={isLoading ? <Loader /> : "Send"} />
          </div>
        </Form>
      </div>
    </>
  );
};

InputMessage.propTypes = {
  selectMember: PropTypes.object,
  type: PropTypes.string,
};

export default InputMessage;
