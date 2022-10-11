/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
// import SocialMediaShare from "../common/SocialMediaShare";
import { useGetListFriend } from "./../../features/friend/friendSlice";
import Loader from "./../common/Loader";
import CustomModal from "./../common/CustomModal";
import InfiniteScroll from "./../InfiniteScroll/InfiniteScroll";
import EmptyComponent from "./../common/EmptyComponent";
import { ImSad } from "react-icons/im";
import { useClipboard } from "@mantine/hooks";
import { TextareaAutosize } from "@mui/material";

export const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "15px",
};

// eslint-disable-next-line no-unused-vars
const Share = ({ post, label }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [friendId, setFriendId] = useState(false);
  const clipboard = useClipboard({ timeout: 1000 });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: listFriend,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListFriend(["friends", "all"], true, undefined, undefined);
  // eslint-disable-next-line no-unused-vars
  const sharePrivate = async () => {};
  // eslint-disable-next-line no-unused-vars
  const sharePublic = async () => {};

  function reloadPage() {
    queryClient.refetchQueries(["friends", "all"]);
  }

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="py-5 m-auto text-center px-2 lg:px-2">
        {"There was an error while fetching the data. "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["friends", "all"])}>
          Tap to retry
        </Link>
      </div>
    );
  } else if (listFriend && listFriend?.pages?.length > 0 && listFriend?.pages[0]?.data?.total > 0) {
    content = (
      <InfiniteScroll
        fetchMore={fetchNextPage}
        isError={isError}
        isLoading={isLoading}
        hasNext={hasNextPage}
        refetch={() => queryClient.invalidateQueries(["friends", "all"])}
        container={true}
        classNameContainer={"overflow-y-auto h-[60vh] w-full"}
        loader={
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        }
        errorRender={
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
            {"There was an error while fetching the data. "}{" "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["friends", "all"])}>
              Tap to retry
            </Link>{" "}
          </div>
        }
      >
        {listFriend?.pages?.map((page) => {
          return page?.data?.data?.map((friend) => {
            return (
              <div
                onClick={() => {
                  if (!friendId) {
                    setFriendId(friend?.id);
                  } else if (friendId === friend?.id) {
                    setFriendId(false);
                  } else {
                    setFriendId(friend?.id);
                  }
                }}
                key={friend?.id}
                className="cursor-pointer border border-placeholder-color p-2 w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    <div className="mr-3">
                      <img src={friend?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-10 h-10" />
                    </div>
                    <div className="text-md">
                      <p className="">{friend?.firstName + " " + friend?.lastName}</p>
                    </div>
                  </div>
                  <div className="text-md">
                    <div className={`w-6 h-6 border rounded-full p-[3px] items-center justify-center`}>
                      {friendId === friend?.id && <div className="bg-primary w-full h-full rounded-full"></div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })}
      </InfiniteScroll>
    );
  } else {
    content = (
      <div className="!flex !justify-center">
        <EmptyComponent
          border={false}
          icon={<ImSad size={"32px"} className="" />}
          placeholder={"Sorry, You don't have any friends yet."}
          tips={"Connect with people you may know or appreciate to know everything about they."}
        />
      </div>
    );
  }

  return (
    <>
      <CustomModal
        modal={modal}
        setModal={setModal}
        content={
          <div>
            <div className="block border-primary">
              <div className="cursor-pointer border-b border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg">Share to Wall</div>

              {/* Modal for list friends */}
              <CustomModal
                modal={open}
                setModal={setOpen}
                content={
                  <div>
                    <div className="mt-2 flex justify-between items-center gap-x-2 gap-y-4">
                      <TextareaAutosize
                        name="message"
                        type="text"
                        className="resize-none border border-placeholder-color align-middle items-center text-xs outline-none w-full bg-transparent text-md placeholder-gray-400 font-light rounded-lg"
                        placeholder={`Write a message...`}
                        maxRows={4}
                        autoFocus={false}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      ></TextareaAutosize>
                      <div>
                        <button
                          disabled={friendId ? false : true}
                          className="cursor-pointer bg-placeholder-color px-4 py-1 w-fit rounded-lg text-sm disabled:opacity-[0.5]"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    <div className="block border-primary mt-2">{content}</div>
                  </div>
                }
                closeIcon={"X"}
                title={"Select a friend and press send"}
                trigger={
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex justify-start cursor-pointer border-b w-full border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg"
                  >
                    {"Share in Private"}
                  </button>
                }
              />
              {/* end of modal friend */}
            </div>
            <div className="flex items-center p-2">
              <p>Copy link:</p>
              <div onClick={() => clipboard.copy(window.location.href)} className="bg-gray-200 p-1 rounded-lg w-[80%] cursor-pointer">
                {clipboard.copied ? "link copied" : window.location.href}
              </div>
            </div>
          </div>
        }
        closeIcon={"X"}
        title={""}
        trigger={
          <button
            onClick={() => setModal(!modal)}
            className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
          >
            {label}
          </button>
        }
      />
    </>
  );
};

Share.propTypes = {
  label: PropTypes.any,
  post: PropTypes.object,
};

export default Share;
