import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../features/chat/component/Home/Sidebar";
import CreateConversation from "../../features/chat/component/Home/CreateConversation";
import ListMessage from "../../features/chat/component/message/ListMessage";

const Message = () => {
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    id ? setSelectedConversation(true) : setSelectedConversation(false);
  }, [id]);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl my-10">
        <div className="flex">
          <Sidebar setSelectedConversation={setSelectedConversation} setCreateConversationOpened={setCreateConversationOpened} />

          {createConversationOpened && <CreateConversation setIsOpened={setCreateConversationOpened} />}
          {!createConversationOpened && !selectedConversation ? (
            <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">
              <h1 className="text-center">Select a friend to start a conversation or choose a conversation to open</h1>
            </div>
          ) : selectedConversation ? (
            <ListMessage />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Message;
