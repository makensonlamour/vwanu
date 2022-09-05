import React, { useState, createContext, useMemo } from "react";

export const MessageContext = createContext();

// eslint-disable-next-line react/prop-types
export const MessageContextProvider = ({ children }) => {
  const [countMessage, setCountMessage] = useState(0);

  function SumArray(arr) {
    if (arr?.length === 0) return 0;
    let sum = 0; // initialize sum

    // Iterate through all elements
    // and add them to sum
    for (let i = 0; i < arr.length; i++) sum += arr[i];

    return sum;
  }

  function countUnreadMessageConversation(arrayObj) {
    if (typeof arrayObj === "undefined" || arrayObj?.length === 0) return countMessage;

    if (arrayObj?.length === 0) return countMessage;

    //calculate unread message for all conversaion
    const unread = arrayObj?.map((item) => {
      return item?.amountOfMessages + item?.amountOfUnreadMessages;
    });

    setCountMessage(SumArray(unread));
  }

  const value = useMemo(
    () => ({
      countUnreadMessageConversation,
      countMessage,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countMessage]
  );
  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
