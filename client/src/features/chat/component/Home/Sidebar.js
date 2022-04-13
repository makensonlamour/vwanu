// import { DEFAULT_AVATAR, IMAGE_PROXY } from "../../shared/constants";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { collection, orderBy, query, where } from "firebase/firestore";

import ClickAwayListener from "../utils/ClickAwayListener";
// import { ConversationInfo } from "../../shared/types";
// import CreateConversation from "./CreateConversation";
// import SelectConversation from "./SelectConversation";
// import Spin from "react-cssfx-loading/src/Spin";
// import UserInfo from "./UserInfo";
// import { auth } from "../../shared/firebase";
// import { db } from "../../shared/firebase";
// import { signOut } from "firebase/auth";
// import { useCollectionQuery } from "../../hooks/useCollectionQuery";
// import { useStore } from "../../store";

const SideBar = () => {
  //random data
  const data = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/" + Math.floor(Math.random() * 10) + "/" + Math.floor(Math.random() * 10) + ".jpg",
      lastMessage: "Hello",
    },
  ];
  const isLoading = false;
  const error = null;

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [createConversationOpened, setCreateConversationOpened] = useState(false);
  const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);

  console.log(createConversationOpened, isUserInfoOpened);

  const location = useLocation();

  return (
    <>
      <div
        className={`border-dark-lighten h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r ${
          location.pathname !== "/" ? "hidden w-[350px] md:!block" : "w-full md:!w-[350px]"
        }`}
      >
        <div className="border-dark-lighten flex h-20 items-center justify-between border-b px-6">
          <Link to="/" className="flex items-center gap-1">
            <h1 className="text-xl">Messages</h1>
          </Link>

          <div className="flex items-center gap-1">
            <button onClick={() => setCreateConversationOpened(true)} className="bg-dark-lighten h-8 w-8 rounded-full">
              <i className="bx bxs-edit text-xl"></i>
            </button>

            <ClickAwayListener onClickAway={() => setIsDropdownOpened(false)}>
              {(ref) => (
                <div ref={ref} className="relative z-10">
                  <img
                    onClick={() => setIsDropdownOpened((prev) => !prev)}
                    className="h-8 w-8 cursor-pointer rounded-full object-cover"
                    src={"https://i.pravatar.cc/300"}
                    alt=""
                  />

                  <div
                    className={`border-dark-lighten bg-dark absolute top-full right-0 flex w-max origin-top-right flex-col items-stretch overflow-hidden rounded-md border py-1 shadow-lg transition-all duration-200 ${
                      isDropdownOpened ? "visible scale-100 opacity-100" : "invisible scale-0 opacity-0"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsUserInfoOpened(true);
                        setIsDropdownOpened(false);
                      }}
                      className="hover:bg-dark-lighten flex items-center gap-1 px-3 py-1 transition duration-300"
                    >
                      <i className="bx bxs-user text-xl"></i>
                      <span className="whitespace-nowrap">Profile</span>
                    </button>
                    <button
                      onClick={() => console.log("signOut")}
                      className="hover:bg-dark-lighten flex items-center gap-1 px-3 py-1 transition duration-300"
                    >
                      <i className="bx bx-log-out text-xl"></i>
                      <span className="whitespace-nowrap">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </ClickAwayListener>
          </div>
        </div>

        {isLoading ? (
          <div className="my-6 flex justify-center">{/*} <Spin /> {*/}</div>
        ) : error ? (
          <div className="my-6 flex justify-center">
            <p className="text-center">Something went wrong</p>
          </div>
        ) : data?.empty ? (
          <div className="my-6 flex flex-col items-center justify-center">
            <p className="text-center">No conversation found</p>
            <button onClick={() => setCreateConversationOpened(true)} className="text-primary text-center">
              Create one
            </button>
          </div>
        ) : (
          <div>
            {/*}
            {data?.docs.map((item) => (
              <SelectConversation key={item.id} conversation={item.data()} conversationId={item.id} />
            ))}
            {*/}
          </div>
        )}
      </div>

      {/*createConversationOpened && <CreateConversation setIsOpened={setCreateConversationOpened} />*/}

      {/*} <UserInfo isOpened={isUserInfoOpened} setIsOpened={setIsUserInfoOpened} />{*/}
    </>
  );
};

export default SideBar;
