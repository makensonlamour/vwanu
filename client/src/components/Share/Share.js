import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
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
import { useCreateConversation, useCreateNewMessage } from "../../features/chat/messageSlice";
import { useCreatePost } from "../../features/post/postSlice";
import toast, { Toaster } from "react-hot-toast";
import { FiShare } from "react-icons/fi";

// export const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

const shareSuccess = (_text) =>
  toast.success("You share this " + _text + " successfully!", {
    position: "top-center",
  });

const shareError = () =>
  toast.error("Sorry. Error on sharing this content!", {
    position: "top-center",
  });

// eslint-disable-next-line no-unused-vars
const Share = ({ post, label, type = "", classNameTrigger, noButton = false, customModal, setCustomModal }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWall, setOpenWall] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [customText, setCustomText] = useState("");
  const [friendId, setFriendId] = useState(false);
  const clipboard = useClipboard({ timeout: 1000 });

  function isPreview() {
    let url = window.location.href.split("/");
    if (url.length <= 4) return false;

    return true;
  }

  let urlShare = isPreview() ? window.location.href : window.location.href + "post/" + post?.id;

  const {
    data: listFriend,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListFriend(["friends", "all"], open, undefined, undefined);
  const createConversation = useCreateConversation(["conversation", "new"], undefined, undefined);
  const sendMessage = useCreateNewMessage(["message", "new"], undefined, undefined);
  const createPost = useCreatePost(["post", "new"], undefined, undefined);
  // eslint-disable-next-line no-unused-vars
  const sharePrivate = async () => {};
  // eslint-disable-next-line no-unused-vars
  const sharePublic = async () => {};

  function reloadPage() {
    queryClient.refetchQueries(["friends", "all"]);
  }

  async function handleCreateConversation() {
    setLoading(true);
    if (!friendId) return alert("Please select a friend.");
    let arrayReceiver = [];
    try {
      arrayReceiver.push(friendId);
      const dataObj = { userIds: arrayReceiver };
      let resultConversation = await createConversation.mutateAsync(dataObj);
      const dataMessage = {
        ConversationId: resultConversation?.data?.ConversationId || resultConversation?.data?.id,
      };

      if (type === "post") {
        if (message.trim() === "") {
          dataMessage.messageText =
            type === "post"
              ? "Hello :) Take a look at this: " + window.location.href + "/post/" + post?.id
              : "Hello :) Take a look at this: " + window.location.href;
        } else {
          dataMessage.messageText =
            type === "post" ? message + ": " + window.location.href + "/post/" + post?.id : message + ": " + window.location.href;
        }
      } else {
        if (message.trim() === "") {
          dataMessage.messageText = "Hello :) Take a look at this: " + window.location.href;
        } else {
          dataMessage.messageText = message + ": " + window.location.href;
        }
      }

      await sendMessage.mutateAsync(dataMessage);
      navigate(`../../messages/${resultConversation?.data?.ConversationId || resultConversation?.data?.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleShareToWall() {
    if (type === "post" && post?.originalId !== null) return alert("Sorry, you can't share to your feed, a post shared.");

    const dataObj = {
      originalId: post?.id,
      privacyType: "public",
      UserId: user?.id,
    };
    let arrayImg = [];
    try {
      if (post?.Media?.length > 0) {
        // eslint-disable-next-line array-callback-return
        post?.Media?.map((file) => {
          arrayImg.push(file.original);
        });
      }
      if (arrayImg?.length > 0) {
        dataObj.mediaLinks = arrayImg;
      }
      dataObj.postText = customText;

      if (type === "post") {
        dataObj.originalType = "Post";
      } else if (type === "blog") {
        dataObj.originalType = "Blogs";
      } else {
        dataObj.originalType = "Discussion";
      }

      await createPost.mutateAsync(dataObj);
      shareSuccess(type);
      noButton ? setCustomModal(false) : setModal(false);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      shareError();
    }
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
      <Toaster />
      <CustomModal
        modal={noButton ? customModal : modal}
        setModal={noButton ? setCustomModal : setModal}
        content={
          <div>
            <div className="block border-primary">
              {/* Share to wall */}
              <CustomModal
                modal={openWall}
                setModal={setOpenWall}
                content={
                  <div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-4">
                      <TextareaAutosize
                        name="customText"
                        type="text"
                        className="resize-none border border-placeholder-color align-middle items-center text-xs outline-none w-full bg-transparent text-md placeholder-gray-400 font-light rounded-lg"
                        placeholder={`Write a post...`}
                        maxRows={6}
                        minRows={4}
                        autoFocus={false}
                        value={customText}
                        onChange={(e) => {
                          setCustomText(e.target.value);
                        }}
                      ></TextareaAutosize>
                      <div className="flex justify-end w-full">
                        <button
                          onClick={() => handleShareToWall()}
                          className="cursor-pointer bg-placeholder-color px-4 py-1 w-fit rounded-lg text-sm disabled:opacity-[0.5]"
                        >
                          {loading ? "Loading" : "Post"}
                        </button>
                      </div>
                    </div>
                  </div>
                }
                closeIcon={"X"}
                title={"Write a custom post and press send"}
                trigger={
                  <button
                    onClick={() => setOpenWall(!openWall)}
                    className="flex justify-start cursor-pointer border-b w-full border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg"
                  >
                    {"Share to feed"}
                  </button>
                }
              />
              {/* <div
                onClick={() => handleShareToWall()}
                className="cursor-pointer border-b border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg"
              >
                Share to feed
              </div> */}

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
                          onClick={() => handleCreateConversation()}
                          disabled={friendId ? false : true}
                          className="cursor-pointer bg-placeholder-color px-4 py-1 w-fit rounded-lg text-sm disabled:opacity-[0.5]"
                        >
                          {loading ? "Loading" : "Send"}
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
              <div onClick={() => clipboard.copy(urlShare)} className="bg-gray-200 p-1 rounded-lg w-[80%] cursor-pointer">
                {clipboard.copied ? "link copied" : urlShare}
              </div>
            </div>
          </div>
        }
        closeIcon={"X"}
        title={""}
        noButton={noButton}
        trigger={
          noButton ? null : (
            <button
              onClick={() => setModal(!modal)}
              className={
                classNameTrigger
                  ? classNameTrigger
                  : "text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
              }
            >
              <FiShare size={"24px"} className="inline p-1" />
              {label}
            </button>
          )
        }
      />
    </>
  );
};

Share.propTypes = {
  label: PropTypes.any,
  post: PropTypes.object,
  type: PropTypes.string,
  classNameTrigger: PropTypes.string,
  noButton: PropTypes.bool,
  customModal: PropTypes.bool,
  setCustomModal: PropTypes.func,
};

export default Share;
