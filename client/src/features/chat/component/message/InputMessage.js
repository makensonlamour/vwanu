import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextArea, Submit, Form } from "../../../../components/form";
import * as Yup from "yup";
import Loader from "../../../../components/common/Loader";
import BoxGif from "../../../../components/common/BoxGif";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineGif } from "react-icons/ai";
import { useCreateConversation, useCreateNewMessage } from "../../messageSlice";
import InputPhoto from "../../../post/components/InputPhoto";

const InputMessage = ({ selectMember, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const [focus, setFocus] = useState(true);
  const [selectedGif, setSelectedGif] = useState("");

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

  const handleSubmit = async (data) => {
    if (data?.message === "" && selectedGif === "") return alert("You can't send an empty message");
    setIsLoading(true);
    setFocus(false);
    try {
      if (type === "new_conversation") {
        let receiver = selectMember?.map((data) => {
          return data?.id;
        });
        const dataObjConversation = { userIds: receiver };
        let resultConversation = await createConversation.mutateAsync(dataObjConversation);
        const dataMessage = { messageText: data?.message, ConversationId: resultConversation?.data?.id };
        await sendMessage.mutateAsync(dataMessage);
        window.location.href = `../../messages/${resultConversation?.data?.id}`;
      } else {
        const messageObj = { messageText: data?.message, ConversationId: selectMember?.id };
        await sendMessage.mutateAsync(messageObj);
      }
      setSelectedGif("");
      data.message = "";
      setFiles([]);
      setOpenUploadPhoto(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setFocus(true);
    }
  };

  return (
    <>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="bg-white z-50">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
          {openUploadPhoto && (
            <div className="flex">
              <div className="w-full px-2">
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
                            key={file.preview}
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
          {selectedGif && (
            <div className="">
              <img src={selectedGif} className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle" alt={"_gif"} />
            </div>
          )}
          <TextArea
            autofocus={focus}
            isableUnderline={true}
            autoCapitalize="none"
            placeholder="Type message"
            name="message"
            type="text"
            maxRows="4"
            minRows="1"
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
                      setSelectedGif("");
                    } else {
                      setOpenUploadPhoto(true);
                      setSelectedGif("");
                    }
                  }
                }}
                className="mr-4"
              >
                <AiOutlineCamera size={"24px"} />
              </button>
              <button className="mr-4">
                <AiOutlineVideoCamera size={"24px"} />
              </button>

              <BoxGif label={<AiOutlineGif size={"24px"} />} setSelectedGif={setSelectedGif} />
            </div>
            <Submit className="my-1 px-4 lg:px-6 lg:py-2 w-fit lg:w-full rounded-xl text-md" title={isLoading ? <Loader /> : "Send"} />
          </div>
        </Form>
      </div>
    </>
  );
};

InputMessage.propTypes = {
  selectMember: PropTypes.array,
  type: PropTypes.string,
};

export default InputMessage;
