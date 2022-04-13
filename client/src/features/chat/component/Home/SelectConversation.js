import { Link, useParams } from "react-router-dom";

import React from "react";
import PropTypes from "prop-types";
// import { IMAGE_PROXY } from "../../shared/constants";
import { Skeleton } from "@mui/material";
// import { useLastMessage } from "../../hooks/useLastMessage";

const SelectConversation = ({ conversation, conversationId }) => {
  // const users = [];
  const loading = true;
  // const currentUser = {};

  // const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const { id } = useParams();

  // const lastMessage = {};

  if (loading)
    return (
      <div className="flex items-stretch gap-2 py-2 px-5">
        <Skeleton className="h-14 w-14 flex-shrink-0" variant="circular" />
        <div className="flex flex-grow flex-col items-start gap-2 py-2">
          <Skeleton className="w-1/2 flex-grow" variant="text" />
          <Skeleton className="w-2/3 flex-grow" variant="text" />
        </div>
      </div>
    );

  /*
  if (conversation.users.length === 2)
    return (
      <Link
        to={`/${conversationId}`}
        className={`hover:bg-dark-lighten relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
          conversationId === id ? "!bg-[#263342]" : ""
        }`}
      >
        <img className="h-14 w-14 flex-shrink-0 rounded-full object-cover" src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)} alt="" />
        <div className="flex flex-grow flex-col items-start gap-1 py-1">
          <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{filtered?.[0].data()?.displayName}</p>
          {lastMessageLoading ? (
            <Skeleton className="w-2/3 flex-grow" />
          ) : (
            <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
              {lastMessage?.message}
            </p>
          )}
        </div>
        {!lastMessageLoading && (
          <>
            {lastMessage?.lastMessageId !== null && lastMessage?.lastMessageId !== conversation.seen[currentUser?.uid] && (
              <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
            )}
          </>
        )}
      </Link>
    );
*/
  return (
    <Link
      to={`/${conversationId}`}
      className={`hover:bg-dark-lighten group relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
        conversationId === id ? "!bg-[#252F3C]" : ""
      }`}
    >
      {conversation?.group?.groupImage ? (
        <img className="h-14 w-14 flex-shrink-0 rounded-full object-cover" src={conversation.group.groupImage} alt="" />
      ) : (
        <div className="relative h-14 w-14">
          {/*}
          <img
            className="absolute top-0 right-0 h-10 w-10 flex-shrink-0 rounded-full object-cover"
            src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
            alt=""
          />
          <img
            className={`border-dark group-hover:border-dark-lighten absolute bottom-0 left-0 z-[1] h-10 w-10 flex-shrink-0 rounded-full border-[3px] object-cover transition duration-300 ${
              conversationId === id ? "!border-[#252F3C]" : ""
            }`}
            src={IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)}
            alt=""
          /> {*/}
        </div>
      )}
      <div className="flex flex-grow flex-col items-start gap-1 py-1">
        {/*}
        <p className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
          
          {conversation?.group?.groupName ||
            filtered
              ?.map((user) => user.data()?.displayName)
              .slice(0, 3)
              .join(", ")}
        </p>
        {lastMessageLoading ? (
          <Skeleton className="w-2/3 flex-grow" />
        ) : (
          <p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
            {lastMessage?.message}
          </p>
        )}
        {*/}
      </div>
      {/*}
      {!lastMessageLoading && (
        <>
          {lastMessage?.lastMessageId !== null && lastMessage?.lastMessageId !== conversation.seen[currentUser?.uid] && (
            <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
          )}
       
        </>
      )}
         {*/}
    </Link>
  );
};

SelectConversation.propTypes = {
  conversation: PropTypes.object,
  conversationId: PropTypes.string,
};

export default SelectConversation;
