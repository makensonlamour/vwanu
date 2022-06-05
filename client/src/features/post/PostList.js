import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link, useOutletContext } from "react-router-dom";
import _ from "lodash";
import reactions from "../../data/reactions";
import { likeArray } from "../../helpers/index";
import { RiShareForwardLine } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import MediaPost from "../../components/form/Post/MediaPost";
import CommentList from "../comment/component/CommentList";
import CommentForm from "../comment/component/CommentForm";
import ReusableDialog from "../../components/common/ReusableDialog";
import ViewLikeButton from "../reaction/component/ViewLikeButton";
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
  const [viewLike, setViewLike] = useState(false);

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

  console.log(post);

  return (
    <>
      {post ? (
        <>
          <Toaster />
          <div className="border-[0.5px] border-slate-200 pb-3 mb-5 mt-4 rounded-lg shadow-md lg:w-full bg-white">
            <div className="pt-3 pb-1 px-3">
              <div className="flex flex-wrap">
                <div>
                  {" "}
                  <img alt="" className="object-cover object-center w-10 h-10 rounded-[14px]" src={post?.User?.profilePicture} />{" "}
                </div>
                <div className="block">
                  <Link
                    className="flex flex-wrap mb-1"
                    to={
                      _.isEqual(pageTitle, "post") || _.isEqual(pageTitle, "profilefeed")
                        ? `../../profile/${post?.User?.id}`
                        : `profile/${post?.User?.id}`
                    }
                  >
                    <span className="ml-3 text-md font-bold text-primary">{`${post?.User?.firstName} ${post?.User?.lastName} `}</span>
                    <span className="text-md font-light ml-2"> {" posted an update"}</span>
                  </Link>
                  <p className="ml-3 font-medium text-sm text-gray-900">
                    {formatDistance(parseISO(post?.createdAt), new Date(), [
                      {
                        includeSeconds: true,
                      },
                    ])}{" "}
                    {" ago"} <span className="ml-2 text-gray-600">{" • "}</span> <span className="ml-2">{post?.privacyType}</span>
                    {}
                  </p>
                </div>
                <span className="ml-auto mt-2">
                  {post?.User?.id === user?.id && (
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
                  )}
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
              {post?.postText?.split("\n").map((text) => {
                return (
                  <p key={text} className="card-text pt-2 w-[100%] font-semibold">
                    {text}
                  </p>
                );
              })}
              {post?.Media?.length > 0 ? <MediaPost medias={post?.Media} /> : null}
              {post?.Reactions?.length || post?.Comments?.length || post?.Share?.length ? (
                <div className="flex flex-nowrap mt-5 pt-2 pb-3 border-b">
                  <div open={viewLike}>
                    <ViewLikeButton
                      reactions={post?.Reactions}
                      label={
                        <Fragment>
                          <p className="text-sm text-secondary">
                            {post?.Reactions?.length > 0 ? (
                              <>
                                <div className="flex text-primary items-center">
                                  <ReactionCounter
                                    reactions={likeArray(post?.Reactions, reactions)}
                                    iconSize={20}
                                    important={["Wadson Vaval"]}
                                    user={user?.firstName + " " + user?.lastName}
                                    style={{ fontSize: "5px" }}
                                    className=" text-primary align-middle"
                                    showOthersAlways={
                                      likeArray(post?.Reactions).length > 0 && post?.Reactions?.UserId === user?.id ? true : false
                                    }
                                    onClick={() => {
                                      setViewLike(!viewLike);
                                      console.log("will show pop up of person who liked it");
                                    }}
                                  />
                                </div>
                              </>
                            ) : null}
                          </p>
                        </Fragment>
                      }
                    />
                  </div>

                  <p className="ml-auto">
                    <Link
                      to={_.isEqual(pageTitle, "post") || _.isEqual(pageTitle, "profilefeed") ? "" : `post/${post?.id}`}
                      className="ml-auto text-xs text-primary mr-2 hover:border-b hover:border-primary"
                    >
                      {post?.Comments?.length ? post?.Comments?.length + " Comments" : null}
                    </Link>
                    <button className="ml-auto text-xs text-primary hover:border-b hover:border-primary">
                      {post?.Shares?.length ? post?.Shares?.length + " shares" : null}
                    </button>
                  </p>
                </div>
              ) : null}

              <div className="flex flex-wrap">
                {/*Reactions*/}
                <Reaction post={post} />

                {/*Comments*/}
                <button
                  onClick={() => setCommentPrev(!commentPrev)}
                  className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
                >
                  <BiComment size={"24px"} className="inline text-white bg-g-one p-1 mask mask-squircle" />
                  {" Comment"}
                </button>
                <button className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2">
                  <RiShareForwardLine size={"24px"} className="inline text-white bg-g-one p-1 mask mask-squircle" />
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
