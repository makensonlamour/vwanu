import React from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import InputMessage from "./InputMessage";
import { useListMessageOfConversation, useGetConversation } from "../../messageSlice";
import SingleMessage from "./SingleMessage";

const ListMessage = () => {
  const { id } = useParams();
  const { data: listMessage } = useListMessageOfConversation(["message", id], id ? true : false, id);
  const { data: conversationData, isLoading } = useGetConversation(["conversation", id], id ? true : false, id);
  const user = useOutletContext();
  const filtered = conversationData?.data?.Users?.filter((item) => item.id !== user?.id);
  return (
    <>
      {isLoading ? (
        <p className="text-lg font-bold">Loading...</p>
      ) : (
        <div className="w-full relative">
          <div className="flex px-5 py-4">
            {conversationData?.data?.Users?.length > 2 ? (
              <div className="flex items-center">
                <div className="mr-2">
                  <img
                    className="mask mask-squircle w-10 h-10"
                    src={filtered[Math.floor(Math.random() * filtered.length)]?.profilePicture}
                    alt=""
                  />
                </div>
                <p className="">
                  {filtered
                    ?.map((item) => item?.firstName + " " + item?.lastName)
                    .slice(0, 3)
                    .join(", ")}
                </p>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="mr-2">
                  {console.log(filtered[0])}
                  <img className="mask mask-squircle w-10 h-10" src={filtered[0]?.profilePicture} alt="" />
                </div>
                {filtered?.map((item) => {
                  return (
                    <p key={item?.firstName + "ml-2 align-center items-center " + item?.lastName} className="">
                      {item?.firstName + " " + item?.lastName}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="h-[47vh] overflow-auto">
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
          </div>
          <div className="absolute bottom-0 w-full">
            <InputMessage type={""} selectMember={conversationData?.data} />
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
