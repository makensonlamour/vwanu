import React from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import InfiniteScroll from "./../InfiniteScroll/InfiniteScroll";
import Loader from "./../common/Loader";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";

const ModalOnlineUser = ({ open, setOpen, label, data, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const queryClient = useQueryClient();
  function reloadPage() {
    queryClient.refetchQueries(["user", "online"]);
  }

  return (
    <>
      <div className="w-80 mx-auto">
        <button onClick={() => setOpen(true)} className="w-full py-1 px-3 text-sm mx-auto font-[500] text-primary hover:text-secondary">
          {label}
        </button>
        {open && (
          <div className="fixed z-[1000] inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-2 border w-full md:w-[30%] shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center">
                <h2 className="my-2 text-md font-semibold text-primary">
                  Online Connections <span className="font-normal text-md text-gray-400">{data?.pages[0]?.data?.total}</span>
                </h2>
                <button onClick={() => setOpen(false)} className="">
                  <AiOutlineClose />
                </button>
              </div>
              <div className="">
                {isLoading ? (
                  <div style={{ display: "flex", justifyContent: "center" }} className="flex justify-center py-5">
                    <Loader color="black" />
                  </div>
                ) : isError ? (
                  <div className="py-5 m-auto text-center px-2">
                    {"There was an error while fetching the data. "}{" "}
                    <Link
                      style={{
                        color: "#053dc8",
                      }}
                      className="text-secondary hover:text-primary"
                      to={""}
                      onClick={() => reloadPage()}
                    >
                      Tap to retry
                    </Link>{" "}
                  </div>
                ) : data?.pages && data?.pages[0]?.data?.total > 0 ? (
                  <ul className="block border-b border-primary" style={{ borderTop: "1px solid #efefef" }}>
                    <InfiniteScroll
                      fetchMore={fetchNextPage}
                      isError={isError}
                      isLoading={isLoading}
                      hasNext={hasNextPage}
                      refetch={() => queryClient.invalidateQueries(["user", "online"])}
                      container={true}
                      classNameContainer={"overflow-y-auto h-[50vh]"}
                      loader={
                        <div className="flex justify-center py-5">
                          <Loader color="black" />
                        </div>
                      }
                      errorRender={
                        <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                          {"There was an error while fetching the data. "}{" "}
                          <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "online"])}>
                            Tap to retry
                          </Link>
                        </div>
                      }
                    >
                      {data?.pages.map((page) => {
                        return page?.data?.data?.map((online) => {
                          return (
                            <div
                              onClick={() => (window.location.href = `../../messages?newMessage=true&otherUserId=${online?.id}`)}
                              key={online?.id}
                              className="flex cursor-pointer justify-between items-center p-2 border-b border-placehgolder-color hover:text-primary"
                            >
                              {/* <div style={{ marginRight: "20px", alignItems: "center" }}>{online?.conte} </div> */}
                              <div className="flex justify-left items-center">
                                <div className="">
                                  <img
                                    width="48px"
                                    height="48px"
                                    className="mask mask-squircle"
                                    src={online?.profilePicture?.original}
                                    alt="_profile"
                                  />
                                </div>
                                <div className="ml-2">
                                  <span>{online?.firstName + " " + online?.lastName}</span>
                                </div>
                              </div>
                              <div className="">Send Message</div>
                            </div>
                          );
                        });
                      })}
                    </InfiniteScroll>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ModalOnlineUser.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  label: PropTypes.string,
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

export default ModalOnlineUser;
