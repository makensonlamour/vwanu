import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom";
import InputMessage from "./InputMessage";
import { useListMessageOfConversation, useGetConversation } from "../../messageSlice";
import SingleMessage from "./SingleMessage";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { useScrollIntoView } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";

const ListMessage = ({ setSelectedConversation, setCreateConversationOpened }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: listMessage } = useListMessageOfConversation(["message", id], id ? true : false, id);
  const { data: conversationData, isLoading } = useGetConversation(["conversation", id], id ? true : false, id);
  const user = useOutletContext();
  const filtered = conversationData?.data?.Users?.filter((item) => item.id !== user?.id);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0 });

  useEffect(() => {
    scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listMessage]);

  return (
    <>
      {isLoading ? (
        <p className="text-lg font-bold">Loading...</p>
      ) : (
        <div className="w-full h-[90vh] max-h-[90vh]">
          <div className="flex py-2 lg:py-4">
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
              <div className="flex items-center justify-between basis-full px-2 lg:mx-5">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setSelectedConversation(false);
                      setCreateConversationOpened(false);
                      navigate("../../messages");
                    }}
                    className="lg:hidden mr-4 px-1 py-1 rounded-xl border border-gray-200 hover:bg-primary"
                  >
                    <BiArrowBack className="inline mr-1" size={"20px"} />
                    Back
                  </button>
                  <div className="mr-2">
                    <img className="mask mask-squircle w-10 h-10" src={filtered[0]?.profilePicture} alt="" />
                  </div>
                  {filtered?.map((item) => {
                    return (
                      <Link
                        to={`../../profile/` + item?.id}
                        key={item?.firstName + "ml-2 align-center items-center " + item?.lastName}
                        className="font-semibold hover:text-primary"
                      >
                        {item?.firstName + " " + item?.lastName}
                      </Link>
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
            <div ref={scrollableRef} className="overflow-auto row-span-3 max-h-[65vh] h-[65vh]">
              {listMessage?.data?.length > 0 &&
                listMessage?.data?.map((message) => {
                  return (
                    <div key={message.id} className="px-2 lg:px-5 py-1">
                      <SingleMessage
                        conversation={conversationData?.data}
                        groups={message?.Conversation?.amountOfPeople > 2 ? true : false}
                        sender={user?.id === message?.senderId ? true : false}
                        listMessage={message}
                      />
                    </div>
                  );
                })}
              <div ref={targetRef} className=""></div> {/*refrence this element to scroll to the end */}
            </div>
            <div className="z-40 row-span-1 max-h-[10vh] h-[10vh]">
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
