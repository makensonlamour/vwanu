import React from "react";
import PropTypes from "prop-types";

const SingleMessage = ({ sender, listMessage }) => {
  console.log(listMessage);
  return (
    <>
      {sender ? (
        <div className="flex flex-wrap justify-end">
          <div className="bg-orange-100 p-2 rounded-xl w-max max-w-[50%]">
            <p className="pb-1 text-sm">{listMessage?.messageText}</p>
            <p className="text-xs text-gray-700">{listMessage?.createdAt}</p>
          </div>
        </div>
      ) : (
        <div className="bg-placeholder-color p-2 rounded-xl w-max max-w-[50%]">
          <p className="pb-1 text-sm">{listMessage?.messageText}</p>
          <p className="text-xs text-gray-300">{listMessage?.createdAt}</p>
        </div>
      )}
    </>
  );
};

SingleMessage.propTypes = {
  conversation: PropTypes.object,
  listMessage: PropTypes.object,
  conversationId: PropTypes.string,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
  sender: PropTypes.bool,
};

export default SingleMessage;
