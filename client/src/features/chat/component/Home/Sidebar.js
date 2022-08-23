/*eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useListConversation } from "../../messageSlice";
import ClickAwayListener from "../utils/ClickAwayListener";
import { IoCreateOutline } from "react-icons/io5";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";

const SideBar = ({ setSelectedConversation, setCreateConversationOpened }) => {
  //random data

  const { data: listConversation, isLoading } = useListConversation(["user", "conversation", "all"], true, 1);
  const error = null;

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`rounded-lr-xl border-dark-lighten h-[80vh] flex-shrink-0 overflow-y-auto overflow-x-hidden border-r ${
          location.pathname !== "/" ? "hidden w-[350px] md:!block" : "w-full md:!w-[350px]"
        }`}
      >
        <div className="border-dark-lighten flex h-20 items-center justify-between px-6">
          <h1 className="text-lg">Messages</h1>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setCreateConversationOpened(true);
                setSelectedConversation(false);
                navigate("../messages");
              }}
              className="bg-dark-lighten h-8 w-8 rounded-full"
            >
              <IoCreateOutline size={"24px"} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="my-6 flex justify-center">{/*} <Spin /> {*/}</div>
        ) : error ? (
          <div className="my-6 flex justify-center">
            <p className="text-center">Something went wrong</p>
          </div>
        ) : listConversation?.data?.length === 0 ? (
          <div className="my-6 flex flex-col items-center justify-center">
            <p className="text-center">No conversation found</p>
            <button
              onClick={() => {
                setCreateConversationOpened(true);
                setSelectedConversation(false);
                navigate("../messages");
              }}
              className="text-primary text-center"
            >
              Create one
            </button>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <p className="text-lg font-bold">Loading...</p>
            ) : (
              listConversation?.data?.map((item) => (
                <SelectConversation
                  setSelectedConversation={setSelectedConversation}
                  setCreateConversationOpened={setCreateConversationOpened}
                  key={item.id}
                  conversation={item}
                  conversationId={item.id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

SideBar.propTypes = {
  setCreateConversationOpened: PropTypes.func.isRequired,
  setSelectedConversation: PropTypes.func.isRequired,
};

export default SideBar;
