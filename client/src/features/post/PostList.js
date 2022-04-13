import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link, useOutletContext } from "react-router-dom";
import _ from "lodash";
import reactions from "../../data/reactions";
import { likeArray } from "../../helpers/index";

import { FaComment, FaShareAlt } from "react-icons/fa";
// import { FcLike } from "react-icons/fc";
import MediaPost from "../../components/form/Post/MediaPost";
import CommentList from "../comment/component/CommentList";
import CommentForm from "../comment/component/CommentForm";
import ReusableDialog from "../../components/common/ReusableDialog";
import { BsThreeDots } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { ReactionCounter } from "@charkour/react-reactions";

import Reaction from "../reaction/component/Reaction";
// import routesPath from "../../../routesPath";

const notify = () =>
  toast.success("Post deleted successfully!", {
    position: "bottom-center",
  });

const PostList = ({ post, pageTitle }) => {
  const user = useOutletContext();
  const [commentPrev, setCommentPrev] = useState(false);
  const [open, setOpen] = useState(false);

  // const openLike = Boolean(openReactions);

  //Dialog functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    // mutation to delete post goes here
    console.log("Yes I agree");
    notify();
    handleClose();
  };

  const handleDisagree = () => {
    console.log("I do not agree.");
    handleClose();
  };

  return (
    <>
      {post ? (
        <>
          <Toaster />
          <div className="border-[0.5px] border-slate-200 pb-3 mb-5 mt-4 rounded-lg shadow-md lg:w-full bg-white">
            <div className="pt-3 pb-1 px-3">
              <div className="flex flex-wrap">
                <Link
                  className="flex flex-wrap mb-1"
                  to={_.isEqual(pageTitle, "post") ? `../../profile/${post?.User?.id}` : `profile/${post?.User?.id}`}
                >
                  <img alt="" className="w-10 h-10 rounded-[14px]" src={post?.User?.profilePicture} />{" "}
                  <span className="ml-3 pt-3 text-md font-bold text-primary">{`${post?.User?.firstName} ${post?.User?.lastName}`}</span>
                </Link>
                <span className="ml-auto pt-3 text-xs text-gray-500">
                  {formatDistance(parseISO(post?.createdAt), new Date(), [
                    {
                      includeSeconds: true,
                    },
                  ])}
                </span>
                <span className="ml-2 mt-2">
                  <button
                    label="Test"
                    onClick={() => {
                      console.log("open", open);
                      handleClickOpen();
                    }}
                    className="flex justify-center items-center"
                  >
                    <BsThreeDots className="h-6 w-6 hover:bg-gray-200" />
                  </button>
                </span>
                <ReusableDialog
                  title={"Delete Post"}
                  action={"delete"}
                  item={"post"}
                  open={open}
                  handleClose={handleClose}
                  handleAgree={handleAgree}
                  handleDisagree={handleDisagree}
                />
              </div>

              <p className="card-text pt-2 w-[100%] font-semibold">{post.postText}</p>
              {post.Media.length > 0 ? <MediaPost medias={post.Media} /> : null}
              <div className="flex flex-nowrap mt-5 pt-2 pb-3 border-b">
                <p className="text-sm text-secondary">
                  {post?.Reactions?.length > 0 ? (
                    <ReactionCounter
                      reactions={likeArray(post?.Reactions, reactions)}
                      important={["vens"]}
                      user={"vens"}
                      className="text-md text-primary"
                      showOthersAlways={likeArray(post?.Reactions).length > 0 && post?.Reactions?.UserId === user?.id ? true : false}
                      onClick={() => {
                        console.log("will show pop up of person who liked it");
                      }}
                    />
                  ) : (
                    <button className=" hover:border-b hover:border-secondary"> {"Be the first to react."}</button>
                  )}
                </p>

                <p className="ml-auto">
                  <Link
                    to={_.isEqual(pageTitle, "post") ? "" : `post/${post?.id}`}
                    className="ml-auto text-sm text-primary mr-3 hover:border-b hover:border-primary"
                  >
                    {post?.Comments ? post.Comments.length : 0}
                    {" Comments"}
                  </Link>
                  <button className="ml-auto text-sm text-primary hover:border-b hover:border-primary">
                    {post?.shares ? post.shares : 0 + " shares"}
                  </button>
                </p>
              </div>

              <div className="flex flex-wrap relative">
                {/*Reactions*/}
                <Reaction post={post} />

                {/*Comments*/}
                <button
                  onClick={() => setCommentPrev(!commentPrev)}
                  className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
                >
                  <FaComment size={20} className="inline text-secondary" />
                  {" Comment"}
                </button>
                <button className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2">
                  <FaShareAlt size={20} className="inline text-secondary" />
                  {" Share"}
                </button>
              </div>
              {/*Check if we are on post page to show all comments, if not show 3 comments*/}
              {_.isEqual(pageTitle, "post") ? (
                <div className="border-t mt-3">
                  <CommentForm PostId={post?.id} />
                  {/* checking if we're on postIdpage. If we're, then rendering all comments, otherwise rendering only 3 */}

                  <CommentList showAll={true} Comments={post?.Comments} />
                </div>
              ) : commentPrev ? (
                <div className="border-t mt-3">
                  <CommentForm PostId={post?.id} />
                  {/* checking if we're on postIdpage. If we're, then rendering all comments, otherwise rendering only 3 */}

                  <CommentList showAll={false} Comments={post?.Comments} />
                  {post?.Comments?.length > 3 ? (
                    <>
                      <div className="text-center text-sm mt-2">
                        <Link className="text-primary hover:text-secondary" to={`post/${post?.id}`}>
                          View more comments...
                        </Link>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

PostList.propTypes = {
  post: PropTypes.object,
  pageTitle: PropTypes.string,
};

export default PostList;
