/*eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useListConversation } from "../../messageSlice";
import ClickAwayListener from "../utils/ClickAwayListener";
import { IoCreateOutline } from "react-icons/io5";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";
import client from "../../../feathers/index";

const SideBar = ({ setSelectedConversation, setCreateConversationOpened }) => {
  //random data

  const user = useOutletContext();
  const { data: listConversation, isLoading } = useListConversation(
    ["user", "conversation", "all"],
    user?.id !== "undefined" ? true : false,
    user?.id
  );
  const error = null;

  const location = useLocation();
  const navigate = useNavigate();

  const onCreatedListener = (notification) => {
    console.log("message from On create listenner", notification);
    /*  if (notification.to.toString() === user.id.toString() && notification.UserId.toString() !== user.id.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }*/
  };
  const notificationService = client.service("message");

  const nots = async () => {
    // const notifications = await notificationService.find({ query: { to: user.id } });
    // notifications.forEach(onCreatedListener);
    notificationService.on("created", onCreatedListener);

    notificationService.on("updated", onCreatedListener);

    // return () => {
    //   notificationService.removeListener("created", onCreatedListener);
    // };
  };

  useEffect(() => {
    nots();
  }, []);

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
