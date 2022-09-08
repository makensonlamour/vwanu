/*eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { useListConversation, useCreateConversation } from "../../messageSlice";
import ClickAwayListener from "../utils/ClickAwayListener";
import { IoCreateOutline } from "react-icons/io5";
import CreateConversation from "./CreateConversation";
import SelectConversation from "./SelectConversation";
import client from "../../../feathers/index";
// import { useQueryClient } from "react-query";
// import { MessageContext } from "../context/MessageContext";

const SideBar = ({ setSelectedConversation, setCreateConversationOpened, selectedConversation, createConversationOpened }) => {
  //random data

  const user = useOutletContext();
  const {
    data: listConversation,
    isLoading,
    isError,
  } = useListConversation(["user", "conversation", "all"], user?.id !== "undefined" ? true : false, user?.id);
  const [searchParams] = useSearchParams();
  const otherUserId = searchParams.get("otherUserId");
  const newMessage = searchParams.get("newMessage");
  const [loading, setLoading] = useState(false);

  const createConversation = useCreateConversation(["conversation", "new"], undefined, undefined);

  const location = useLocation();
  const navigate = useNavigate();
  let run = true;
  async function handleCreateConversation() {
    setLoading(true);
    try {
      const dataObj = { userIds: otherUserId };
      let resultConversation;
      console.log(newMessage, otherUserId, run, newMessage && otherUserId && run);
      if (newMessage && otherUserId && run) {
        run = false;
        resultConversation = await createConversation.mutateAsync(dataObj);
      }
      navigate(`../../messages/${resultConversation?.data?.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (newMessage && otherUserId && run) {
      console.log(run);
      handleCreateConversation();
    }
    if (run === false) {
      return () => {
        // cancel the subscription
        console.log("cancel subscription", run);
      };
    }
  }, [otherUserId, newMessage]);
  console.log(location.pathname);

  return (
    <>
      {!loading ? (
        <div
          className={`rounded-lr-xl border-dark-lighten lg:h-[80vh] flex-shrink-0 overflow-y-auto overflow-x-none border-r ${
            location.pathname !== "/messages" || selectedConversation || createConversationOpened
              ? "hidden w-[350px] lg:!block"
              : "w-full lg:!w-[350px]"
          }`}
        >
          <div className="border-dark-lighten flex h-20 items-center justify-between px-2 lg:px-6">
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
            <div className="my-6 flex justify-center">Loading...{/*} <Spin /> {*/}</div>
          ) : isError ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

SideBar.propTypes = {
  setCreateConversationOpened: PropTypes.func.isRequired,
  setSelectedConversation: PropTypes.func.isRequired,
  selectedConversation: PropTypes.bool,
  createConversationOpened: PropTypes.bool,
};

export default SideBar;
