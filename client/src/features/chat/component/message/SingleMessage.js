import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { parseISO, formatRelative } from "date-fns";
import { enUS } from "date-fns/esm/locale";
import { GrFormView } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { useReadMessage } from "../../messageSlice";
import { transformHashtagAndLink } from "../../../../helpers/index";
import MediaMessage from "./MediaMessage";

const formatRelativeLocale = {
  lastWeek: "P ' at ' p",
  yesterday: "P ' at ' p",
  today: "p",
  tomorrow: "P p",
  nextWeek: "P p",
  other: "P p", // Difference: Add time to the date
};

const locale = {
  ...enUS,
  formatRelative: (token) => formatRelativeLocale[token],
};

const SingleMessage = ({ groups, sender, listMessage, conversation }) => {
  // console.log(listMessage);
  const readMessage = useReadMessage(["message", "read", listMessage?.id], undefined, undefined);
  const handleRead = async () => {
    try {
      const dataObj = {
        read: true,
        id: listMessage?.id,
      };
      if (!sender && listMessage?.read === false) {
        let result = await readMessage.mutateAsync(dataObj);
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);
  return (
    <>
      {groups ? (
        sender ? (
          <div className="flex flex-wrap justify-end">
            <div className="bg-orange-100 p-2 rounded-xl w-max max-w-[50%]">
              <p className="pb-1 text-sm">{listMessage?.messageText}</p>
              <p className="text-xs text-gray-700 align-middle">
                {formatRelative(parseISO(listMessage?.createdAt), new Date(), { locale })}
                <span className="inline">
                  {listMessage?.read ? (
                    <GrFormView size={"20px"} className="pl-1 items-center inline align-middle" />
                  ) : (
                    <IoIosSend size={"20px"} className="pl-1 items-center inline align-middle" />
                  )}
                </span>
              </p>
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
                <p className="text-xs text-gray-600">{formatRelative(parseISO(listMessage?.createdAt), new Date(), { locale })}</p>
              </div>
            </div>
          </>
        )
      ) : sender ? (
        <div className="flex flex-wrap justify-end">
          <div className="bg-orange-100 px-2 py-1 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-max max-w-[70%]">
            {listMessage?.messageText?.split("\n").map((text) => {
              return (
                <p key={text} className="text-sm">
                  {transformHashtagAndLink(text)}
                </p>
              );
            })}
            {listMessage?.Media?.length > 0 ? <MediaMessage sender={listMessage?.sender} medias={listMessage?.Media} /> : null}
            <p className="text-xs text-gray-700 align-middle text-right">
              {formatRelative(parseISO(listMessage?.createdAt), new Date(), { locale })}
              <span className="inline">
                {conversation?.Messages[0]?.id === listMessage?.id &&
                  (listMessage?.read ? <span className="">{` • Read`}</span> : <span className="">{` • Sent`}</span>)}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-placeholder-color px-2 py-1 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl w-max max-w-[70%] lg:pl-5">
          {listMessage?.messageText?.split("\n").map((text) => {
            return (
              <p key={text} className="text-sm">
                {transformHashtagAndLink(text)}
              </p>
            );
          })}
          {listMessage?.Media?.length > 0 ? <MediaMessage sender={listMessage?.sender} medias={listMessage?.Media} /> : null}
          <p className="text-xs text-gray-600 text-right">{formatRelative(parseISO(listMessage?.createdAt), new Date(), { locale })}</p>
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
