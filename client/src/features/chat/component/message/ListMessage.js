/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom";
import InputMessage from "./InputMessage";
import { useListMessageOfConversation, useGetConversation } from "../../messageSlice";
import SingleMessage from "./SingleMessage";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { useScrollIntoView } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../../../components/common/Loader";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../../../components/InfiniteScroll/InfiniteScroll";
import _ from "lodash";

const ListMessage = ({ setSelectedConversation, setCreateConversationOpened }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const {
    data: listMessage,
    isError,
    isLoading: messageLoading,
    hasNextPage,
    fetchNextPage,
  } = useListMessageOfConversation(["message", id], id ? true : false, id);
  const { data: conversationData, isLoading } = useGetConversation(["conversation", id], id ? true : false, id);
  const user = useOutletContext();
  const filtered = conversationData?.Users?.filter((item) => item.id !== user?.id);
  // const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0 });

  const targetRef = useRef(null);

  function handleScroll() {
    console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight);
    if (window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight < -5) return;
  }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // targetRef.current?.scrollIntoView({ behavior: "auto" });
  // console.log(targetRef.current);
  // scrollIntoView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // return () => window.removeEventListener("scroll", handleScroll);
  // }, [scrollPosition, setScrollPosition]);

  const queryClient = useQueryClient();
  function reloadPage() {
    queryClient.refetchQueries(["message", id]);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-5">
          <Loader color="black" />
        </div>
      ) : (
        filtered && (
          <div className="w-full h-full">
            <div className="w-full flex py-2 lg:pt-3">
              {conversationData?.data?.Users?.length > 2 ? (
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="mask mask-squircle w-10 h-10"
                      src={filtered[Math.floor(Math.random() * filtered.length)]?.profilePicture}
                      alt=""
                    />
                  </div>
                  <p className="font-semibold">
                    {filtered
                      ?.map((item) => item?.firstName + " " + item?.lastName)
                      .slice(0, 3)
                      .join(", ")}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full px-2 lg:mx-0 pb-3 border-b">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        setSelectedConversation(false);
                        setCreateConversationOpened(false);
                        navigate("../../messages");
                      }}
                      className="lg:hidden mr-4 px-1 py-1 rounded-xl border border-gray-200 hover:bg-primary"
                    >
                      <BiArrowBack className="inline mr-1" size={"20px"} />
                      Back
                    </button>
                    <div className="mr-2">
                      <img
                        className="mask mask-squircle w-10 h-10"
                        src={filtered !== "undefined" ? filtered[0]?.profilePicture : ""}
                        alt=""
                      />
                    </div>
                    {filtered?.map((item) => {
                      return (
                        <Link
                          to={`../../profile/` + item?.id}
                          key={item?.firstName + "ml-2 align-center items-center " + item?.lastName}
                          className="font-semibold hover:text-primary"
                        >
                          {item?.firstName + " " + item?.lastName}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        window.open("../../call", "MsgWindow", "toolbar=no,scrollbars=no,resizable=no,top=0,left=0,width=600,height=600")
                      }
                      className="mr-2"
                    >
                      <IoVideocamOutline size={"22px"} className="hover:text-secondary" />
                    </button>
                    <button
                      onClick={() =>
                        window.open("../../call", "MsgWindow", "toolbar=no,scrollbars=no,resizable=no,top=0,left=0,width=600,height=600")
                      }
                      className="ml-2"
                    >
                      <IoCallOutline size={"22px"} className="hover:text-secondary" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-nowrap h-[79.50vh] lg:h-[81.75vh] xl:h-[80.15vh] justify-between">
              {messageLoading ? (
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
              ) : listMessage?.pages && listMessage?.pages?.length && listMessage?.pages[0]?.data?.total > 0 ? (
                <InfiniteScroll
                  fetchMore={fetchNextPage}
                  isError={isError}
                  isLoading={isLoading}
                  hasNext={hasNextPage}
                  refetch={() => queryClient.invalidateQueries(["message", id])}
                  container={true}
                  isReverse={true}
                  classNameContainer={"overflow-y-auto scrollbar h-fit max-h-[72vh]"}
                  loader={
                    <div className="flex justify-center py-5">
                      <Loader color="black" />
                    </div>
                  }
                  errorRender={
                    <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                      {"There was an error while fetching the data. "}{" "}
                      <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["message", id])}>
                        Tap to retry
                      </Link>{" "}
                    </div>
                  }
                >
                  {[]
                    .concat(listMessage?.pages)
                    ?.reverse()
                    ?.map((page) => {
                      let array = page?.data?.data;
                      // console.log([].concat(array).reverse());
                      // return []
                      //   .concat(array)
                      //   .reverse()
                      return []
                        .concat(array)
                        .reverse()
                        ?.map((message) => {
                          return (
                            <div key={message?.id} className="px-2 lg:px-5 py-1 mb-1">
                              <SingleMessage
                                conversation={conversationData?.data}
                                groups={message?.Conversation?.amountOfPeople > 2 ? true : false}
                                sender={user?.id === message?.senderId ? true : false}
                                listMessage={message}
                              />
                            </div>
                          );
                        });
                    })}
                </InfiniteScroll>
              ) : // <div ref={scrollableRef} className="w-full overflow-y-auto">
              //   {listMessage?.data?.length > 0 &&
              //     listMessage?.data?.map((message) => {
              //       return (
              //         <div key={message?.id} className="px-2 lg:px-5 py-1">
              //           <SingleMessage
              //             conversation={conversationData?.data}
              //             groups={message?.Conversation?.amountOfPeople > 2 ? true : false}
              //             sender={user?.id === message?.senderId ? true : false}
              //             listMessage={message}
              //           />
              //         </div>
              //       );
              //     })}
              //   <div ref={targetRef} className=""></div> {/*refrence this element to scroll to the end */}
              // </div>
              null}
              <div ref={targetRef} className=""></div> {/*refrence this element to scroll to the end */}
              <div className="z-40 w-full h-fit">
                <InputMessage type={""} selectMember={conversationData} />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

ListMessage.propTypes = {
  conversation: PropTypes.object,
  conversationData: PropTypes.object,
  conversationId: PropTypes.string,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
};

export default ListMessage;
