/*eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import InputMessage from "./InputMessage";
import { useListMessageOfConversation, useGetConversation } from "../../messageSlice";
import SingleMessage from "./SingleMessage";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { useScrollIntoView } from "@mantine/hooks";

const ListMessage = () => {
  const { id } = useParams();
  const { data: listMessage } = useListMessageOfConversation(["message", id], id ? true : false, id);
  const { data: conversationData, isLoading } = useGetConversation(["conversation", id], id ? true : false, id);
  const user = useOutletContext();
  const filtered = conversationData?.data?.Users?.filter((item) => item.id !== user?.id);
  const [messagesList, setMessagesList] = useState([]);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0 });

  useEffect(() => {
    scrollIntoView();
    console.log("scroll");
  }, [listMessage]);

  return (
    <>
      {isLoading ? (
        <p className="text-lg font-bold">Loading...</p>
      ) : (
        <div className="w-full h-[85%] max-h-[80vh]">
          <div className="flex py-4">
            {conversationData?.data?.Users?.length > 2 ? (
              <div className="flex items-center">
                <div className="mr-2">
                  <img
                    className="mask mask-squircle w-10 h-10"
                    src={filtered[Math.floor(Math.random() * filtered.length)]?.profilePicture}
                    alt=""
                  />
                </div>
                <p className="font-semibold">
                  {filtered
                    ?.map((item) => item?.firstName + " " + item?.lastName)
                    .slice(0, 3)
                    .join(", ")}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between basis-full mx-5">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img className="mask mask-squircle w-10 h-10" src={filtered[0]?.profilePicture} alt="" />
                  </div>
                  {filtered?.map((item) => {
                    return (
                      <p key={item?.firstName + "ml-2 align-center items-center " + item?.lastName} className="font-semibold">
                        {item?.firstName + " " + item?.lastName}
                      </p>
                    );
                  })}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      window.open("../../call", "MsgWindow", "toolbar=no,scrollbars=no,resizable=no,top=0,left=0,width=600,height=600")
                    }
                    className="mr-2"
                  >
                    <IoVideocamOutline size={"22px"} className="hover:text-secondary" />
                  </button>
                  <button
                    onClick={() =>
                      window.open("../../call", "MsgWindow", "toolbar=no,scrollbars=no,resizable=no,top=0,left=0,width=600,height=600")
                    }
                    className="ml-2"
                  >
                    <IoCallOutline size={"22px"} className="hover:text-secondary" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="grid grid-rows-4 max-h-full h-full">
            <div ref={scrollableRef} className="overflow-auto row-span-3">
              {listMessage?.data?.length > 0 &&
                listMessage?.data?.map((message) => {
                  return (
                    <div key={message.id} className="px-5 py-2">
                      <SingleMessage
                        groups={message?.Conversation?.amountOfPeople > 2 ? true : false}
                        sender={user?.id === message?.senderId ? true : false}
                        listMessage={message}
                      />
                    </div>
                  );
                })}
              <div ref={targetRef} className=""></div> {/*refrence this element to scroll to the end */}
            </div>
            <div className="row-span-1">
              <InputMessage type={""} selectMember={conversationData?.data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ListMessage.propTypes = {
  conversation: PropTypes.object,
  conversationData: PropTypes.object,
  conversationId: PropTypes.string,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
};

export default ListMessage;
