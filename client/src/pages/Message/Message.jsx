import React from "react";
import Sidebar from "../../features/chat/component/Home/Sidebar";

const Message = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">
          <h1 className="text-center">Select a friend to start a conversation</h1>
        </div>
      </div>
    </>
  );
};

export default Message;
