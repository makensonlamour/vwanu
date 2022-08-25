import React from "react";
import PropTypes from "prop-types";

const SingleMessage = ({ groups, sender, listMessage }) => {
  console.log(listMessage);
  return (
    <>
      {groups ? (
        sender ? (
          <div className="flex flex-wrap justify-end">
            <div className="bg-orange-100 p-2 rounded-xl w-max max-w-[50%]">
              <p className="pb-1 text-sm">{listMessage?.messageText}</p>
              <p className="text-xs text-gray-700">{listMessage?.createdAt}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-start">
              <div className="mr-2">
                <img className="mask mask-squircle w-8 h-8" alt="_" src={listMessage?.sender?.profilePicture} />
              </div>
              <div className="bg-placeholder-color p-2 rounded-xl w-max max-w-[50%]">
                <p className="pb-1 text-sm font-bold text-secondary">
                  {listMessage?.sender?.firstName + " " + listMessage?.sender?.lastName}
                </p>
                <p className="pb-1 text-sm">{listMessage?.messageText}</p>
                <p className="text-xs text-gray-300">{listMessage?.createdAt}</p>
              </div>
            </div>
          </>
        )
      ) : sender ? (
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
  groups: PropTypes.bool,
};

export default SingleMessage;
