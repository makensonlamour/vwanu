/*eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../features/chat/component/Home/Sidebar";
import CreateConversation from "../../features/chat/component/Home/CreateConversation";
import ListMessage from "../../features/chat/component/message/ListMessage";
import { useMediaQuery } from "@mantine/hooks";

const Message = () => {
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(false);
  const { id } = useParams();
  const matches = useMediaQuery("(max-width: 1024px)");

  console.log(matches);

  useEffect(() => {
    id ? setSelectedConversation(true) : setSelectedConversation(false);
  }, [id]);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl my-2 lg:my-10 h-[100vh] overflow-y-auto overscroll-x-none lg:overscroll-none">
        <div className="grid grid-cols-12 lg:w-[85vw]">
          <div className={`${matches && (selectedConversation || createConversationOpened) ? "hidden" : ""} col-span-12 lg:col-span-3`}>
            <Sidebar
              createConversationOpened={createConversationOpened}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              setCreateConversationOpened={setCreateConversationOpened}
            />
          </div>
          <div className="col-span-12 lg:col-span-9 lg:pl-6">
            {createConversationOpened && (
              <CreateConversation
                setIsOpened={setCreateConversationOpened}
                setSelectedConversation={setSelectedConversation}
                setCreateConversationOpened={setCreateConversationOpened}
              />
            )}
            {!createConversationOpened && !selectedConversation ? (
              <div className="hidden lg:px-6 flex-grow flex-col items-center justify-center gap-1 lg:!flex">
                <h1 className="text-center">Select a friend to start a conversation or choose a conversation to open</h1>
              </div>
            ) : selectedConversation ? (
              <ListMessage setSelectedConversation={setSelectedConversation} setCreateConversationOpened={setCreateConversationOpened} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
