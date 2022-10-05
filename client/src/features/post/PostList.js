/*eslint-disable */
import React, { useState, Fragment } from "react";
import cryptoRandomString from "crypto-random-string";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link, useOutletContext } from "react-router-dom";
import _ from "lodash";
import reactions from "../../data/reactions";
import { likeArray, transformHashtagAndLink } from "../../helpers/index";
// import { RiShareForwardLine } from "react-icons/ri";
// import { BiComment } from "react-icons/bi";
import MediaPost from "../../components/form/Post/MediaPost";
import CommentList from "../comment/component/CommentList";
import CommentForm from "../comment/component/CommentForm";
import ReusableDialog from "../../components/common/ReusableDialog";
import ViewLikeButton from "../reaction/component/ViewLikeButton";
import Share from "../../components/Share/Share";
// import koremPNG from "../../assets/images/reactions/korem2.png";
import { ReactComponent as koremPNG } from "../../assets/images/reactions/korem2.png";

// import { BsThreeDots } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
// import { ReactionCounter } from "@charkour/react-reactions";

import Reaction from "../reaction/component/Reaction";
import MenuPost from "./components/MenuPost";
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

  return (
    <>
      {post ? (
        <>
          <Toaster />
          <div className="border-[0.5px] border-slate-200 pb-3 mb-3 mt-2 rounded-lg shadow-md lg:w-full bg-white">
            <div className="pt-3 pb-1 px-3">
              <div className="flex flex-wrap mb-1">
                <div>
                  {" "}
                  <img alt="" className="object-cover object-center w-10 h-10 rounded-[14px]" src={post?.User?.profilePicture} />{" "}
                </div>
                <div className="block w-[80%]">
                  <Link
                    className="flex flex-nowrap mb-1"
                    to={
                      _.isEqual(pageTitle, "post") || _.isEqual(pageTitle, "profilefeed")
                        ? `../../profile/${post?.User?.id}`
                        : `../../profile/${post?.User?.id}`
                    }
                  >
                    <span className="ml-3 text-sm font-bold hover:text-primary line-clamp-1 w-[80%]">{`${post?.User?.firstName} ${post?.User?.lastName} `}</span>
                  </Link>
                  <p className="ml-3 font-medium text-xs text-gray-900">
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
                    <MenuPost post={post} />
                    // <button
                    //   label="Test"
                    //   onClick={() => {
                    //     handleClickOpen();
                    //   }}
                    //   className="flex justify-center items-center"
                    // >
                    //   <BsThreeDots className="h-6 w-6 hover:bg-gray-200" />
                    // </button>
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
                  <p key={cryptoRandomString({ length: 10 })} className="card-text pt-0 w-[100%] font-normal">
                    {transformHashtagAndLink(text)}
                  </p>
                );
              })}
              {post?.Media?.length > 0 ? <MediaPost medias={post?.Media} /> : null}
              {post?.amountOfReactions !== 0 || post?.amountOfComments !== 0 ? (
                <div className="flex flex-nowrap mt-5 pt-2 pb-3 border-b">
                  <div open={viewLike}>
                    <ViewLikeButton
                      amountOfReactions={post?.amountOfReactions}
                      postId={post?.id}
                      label={
                        <Fragment>
                          <p className="text-sm text-secondary">
                            {post?.amountOfReactions > 0 ? (
                              <>
                                <div className="flex text-primary items-center">
                                  <p className="flex justify-start items-center">
                                    {/* <img height={18} width={18} src={koremPNG} alt="_kore" /> */}
                                    <koremPNG width={18} height={18} className="text-black" />
                                    <span className="ml-1">
                                      {post?.isReactor && post?.isReactor?.length === 1
                                        ? post?.amountOfReactions - 1 === 0
                                          ? "You react on this post"
                                          : "You and "
                                        : null}
                                    </span>
                                    <span>
                                      {
                                        post?.amountOfReactions === 0
                                          ? null
                                          : post?.amountOfReactions > 1 && post?.isReactor?.length === 1
                                          ? post?.amountOfReactions - 1 + " other people" //I like and more than one like the post
                                          : post?.isReactor && post?.isReactor?.length - 1 === 0
                                          ? null
                                          : post?.amountOfReactions + " other people" //I don't like and other people like
                                      }
                                    </span>
                                  </p>
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
                      to={_.isEqual(pageTitle, "post") || _.isEqual(pageTitle, "profilefeed") ? "" : `../../post/${post?.id}`}
                      className="ml-auto text-xs text-primary mr-2 hover:border-b hover:border-primary"
                    >
                      {post?.amountOfComments === 0
                        ? null
                        : post?.amountOfComments === 1
                        ? post?.amountOfComments + " Comment"
                        : post?.amountOfComments + " Comments"}
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
                  className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
                >
                  {/* <BiComment size={"24px"} className="inline text-white bg-g-one p-1 mask mask-squircle" /> */}
                  {" Comment"}
                </button>
                <Share post={post} label={" Share"} link={""} />
              </div>
              {/*Check if we are on post page to show all comments, if not show 3 comments*/}
              {_.isEqual(pageTitle, "post") ? (
                <div className="border-t mt-3">
                  <CommentForm PostId={post?.id} />
                  {/* checking if we're on postIdpage. If we're, then rendering all comments, otherwise rendering only 3 */}

                  <CommentList showAll={true} postId={post?.id} />
                </div>
              ) : commentPrev ? (
                <div className="border-t mt-3">
                  <CommentForm PostId={post?.id} />
                  {/* checking if we're on postIdpage. If we're, then rendering all comment, otherwise rendering only 3 */}

                  <CommentList showAll={false} postId={post?.id} />
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
