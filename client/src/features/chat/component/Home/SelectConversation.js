/*eslint-disable */
import { Link, useParams, useOutletContext } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

const SelectConversation = ({ setSelectedConversation, setCreateConversationOpened, conversation, conversationId }) => {
  /* const loading = true;
  // const currentUser = {};

  // const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const { id } = useParams();

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
*/
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

  const { id } = useParams();
  const user = useOutletContext();

  const filtered = conversation?.Users?.filter((item) => item.id !== user?.id);

  return (
    <>
      <div className="overflow-auto">
        {conversation?.Users?.length > 2 ? (
          <Link
            onClick={() => {
              setSelectedConversation(true);
              setCreateConversationOpened(false);
            }}
            to={`../messages/${conversationId}`}
            className={`mx-2 rounded-xl hover:bg-dark-lighten group relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
              conversationId === id ? "bg-placeholder-color" : ""
            }`}
          >
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
                  ?.map((item) => item?.firstName)
                  .slice(0, 3)
                  .join(", ")}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            key={conversationId}
            to={`../messages/${conversationId}`}
            className={`mx-2 rounded-xl hover:bg-dark-lighten group relative flex items-stretch gap-2 py-2 px-5 transition duration-300 ${
              conversationId === id ? "bg-placeholder-color" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="mr-2">
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
          </Link>
        )}
      </div>
      {/*}
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
          /> }
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
        
      </div>
      {/*}
      {!lastMessageLoading && (
        <>
          {lastMessage?.lastMessageId !== null && lastMessage?.lastMessageId !== conversation.seen[currentUser?.uid] && (
            <div className="bg-primary absolute top-1/2 right-4 h-[10px] w-[10px] -translate-y-1/2 rounded-full"></div>
          )}
       
        </>
      )}
    </Link>
          {*/}
    </>
  );
};

SelectConversation.propTypes = {
  conversation: PropTypes.object,
  conversationId: PropTypes.string,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
};

export default SelectConversation;
