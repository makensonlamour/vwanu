import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextArea, Submit, Form } from "../../../../components/form";
import * as Yup from "yup";
import Loader from "../../../../components/common/Loader";
import { useCreateConversation, useCreateNewMessage } from "../../messageSlice";

const InputMessage = ({ selectMember, type }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
    } catch (e) {
      console.log(e);
    } finally {
      data.message = "";
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
          <TextArea
            isableUnderline={true}
            autoCapitalize="none"
            placeholder="Type message"
            name="message"
            type="text"
            maxRows="5"
            minRows="1"
            style={{ width: "100%", border: "none" }}
            sx={{
              input: {
                border: "none",
              },
            }}
            className="appearance-none mb-1 p-2 outline-0 text-secondary placeholder:text-gray-300 focus:border-0 rounded-2xl border-0"
          />
          <div className="flex justify-end">
            <Submit className="w-full rounded-2xl text-base-100 text-md md:w-max" title={isLoading ? <Loader /> : "Send"} />
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
