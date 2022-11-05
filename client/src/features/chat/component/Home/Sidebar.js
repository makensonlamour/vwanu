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
import Loader from "../../../../components/common/Loader";
import { useQueryClient } from "react-query";
import { FaLaptopHouse } from "react-icons/fa";
import InfiniteScroll from "../../../../components/InfiniteScroll/InfiniteScroll";
// import { MessageContext } from "../context/MessageContext";

const SideBar = ({ setSelectedConversation, setCreateConversationOpened, selectedConversation, createConversationOpened }) => {
  //random data
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const {
    data: listConversation,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
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
    let arrayReceiver = [];
    try {
      arrayReceiver.push(otherUserId);
      const dataObj = { userIds: arrayReceiver };
      let resultConversation;
      if (newMessage && otherUserId && run) {
        run = false;
        resultConversation = await createConversation.mutateAsync(dataObj);
      }
      navigate(`../../messages/${resultConversation?.data?.ConversationId || resultConversation?.data?.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function reloadPage() {
    queryClient.refetchQueries(["user", "conversation", "all"]);
  }

  useEffect(() => {
    if (newMessage && otherUserId && run) {
      console.log(run);
      handleCreateConversation();
    }
    if (run === false) {
      return () => {
        // cancel the subscription
      };
    }
  }, [otherUserId, newMessage]);

  return (
    <>
      {!loading ? (
        <div
          className={`rounded-lr-xl w-full border-dark-lighten h-full flex-shrink-0 scrollbar overflow-y-auto overflow-x-none border-r ${
            location.pathname !== "/messages" || selectedConversation || createConversationOpened
              ? "hidden w-full md:!block"
              : "w-full md:!w-full"
          }`}
        >
          <div className="border-dark-lighten flex h-16 items-center justify-between px-2 lg:px-3">
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
            // <div className="my-6 flex justify-center">Loading...{/*} <Spin /> {*/}</div>
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          ) : isError ? (
            <div className="py-5 m-auto text-center px-2">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
                Tap to retry
              </Link>{" "}
            </div>
          ) : listConversation?.pages && listConversation?.pages?.length > 0 && listConversation?.pages[0]?.data?.total > 0 ? (
            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center py-5">
                  <Loader color="black" />
                </div>
              ) : (
                <InfiniteScroll
                  fetchMore={fetchNextPage}
                  isError={isError}
                  isLoading={isLoading}
                  hasNext={hasNextPage}
                  refetch={() => queryClient.invalidateQueries(["user", "conversation", "all"])}
                  container={FaLaptopHouse}
                  classNameContainer={"overflow-y-auto h-fit scrollbar max-h-[46vh]"}
                  loader={
                    <div className="flex justify-center py-5">
                      <Loader color="black" />
                    </div>
                  }
                  errorRender={
                    <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                      {"There was an error while fetching the data. "}{" "}
                      <Link
                        className="text-secondary hover:text-primary"
                        to={""}
                        onClick={() => reloadPage(["user", "conversation", "all"])}
                      >
                        Tap to retry
                      </Link>{" "}
                    </div>
                  }
                >
                  {listConversation?.pages.map((page) => {
                    return page?.data?.data?.map((item) => {
                      return (
                        <SelectConversation
                          setSelectedConversation={setSelectedConversation}
                          setCreateConversationOpened={setCreateConversationOpened}
                          key={item?.id}
                          conversation={item}
                          conversationId={item?.id}
                        />
                      );
                    });
                  })}
                </InfiniteScroll>
              )}
            </div>
          ) : (
            <div className="w-full">
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
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-5">
          <Loader color="black" />
        </div>
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
