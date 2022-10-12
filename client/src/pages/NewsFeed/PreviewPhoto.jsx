import React, { Fragment, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
// import VideoPlayer from "react-videoplayer";
import "video-react/dist/video-react.css";
import _ from "lodash";
import ReactSlidy from "react-slidy";
import Reaction from "../../features/reaction/component/Reaction";
import Share from "../../components/Share/Share";
import ViewLikeButton from "../../features/reaction/component/ViewLikeButton";
import koremPNG from "../../assets/images/reactions/korem2.png";
import Loader from "../../components/common/Loader";
import CommentForm from "../../features/comment/component/CommentForm";
import { useGetPost } from "../../features/post/postSlice";
import { useQueryClient } from "react-query";
import logo from "../../assets/images/Asset_9.png";
import { AiOutlineClose } from "react-icons/ai";
import CommentList from "./../../features/comment/component/CommentList";
import ResponsivePlayer from "../../components/common/ResponsivePlayer";

const PreviewPhoto = () => {
  const queryClient = useQueryClient();
  const [commentPrev, setCommentPrev] = useState(false);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("posts");
  const type = searchParams.get("type");
  const pageTitle = searchParams.get("from");
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useGetPost(["post", "single", postId], postId !== null ? true : false, postId);

  return (
    <>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
            {"There was an error while fetching the data. "}{" "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.InvalidateQueries(["post", postId])}>
              Tap to retry
            </Link>{" "}
          </div>
        ) : post && Object.keys(post).length > 0 ? (
          <div className="justify-center flex overflow-x-hidden overflow-y-auto scrollbar fixed bg-black bg-opacity-[0.95] h-full w-full z-20 outline-none focus:outline-none">
            <div className="relative w-full ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex justify-between flex-col md:flex-row w-full">
                  <div className="flex justify-center flex-wrap w-full lg:py-2">
                    <div className="flex items-start justify-start w-full h-fit">
                      <button onClick={() => navigate(-1)} className=" text-white px-2 lg:pl-2">
                        <AiOutlineClose size={"24px"} className="text-white" />
                      </button>
                      <Link className="" to={`../../`}>
                        <div className="w-10 h-8 md:w-full">
                          <img className="h-10 w-12 object-cover" src={logo} alt="logo_vwanu" />
                        </div>
                      </Link>
                    </div>
                    {type === "photo" ? (
                      <div className="w-[90%] lg:max-w-[900px] h-full lg:h-[90vh] flex items-center justify-center bg-black pt-0 pb-0 lg:py-0">
                        <ReactSlidy imageObjectFit="contain">
                          {post?.Media?.map((item) => {
                            return (
                              <img
                                key={item?.original}
                                alt={"_img"}
                                className="bg-black mx-auto object-contain"
                                style={{ maxHeight: "90vh" }}
                                src={item?.original}
                              />
                            );
                          })}
                        </ReactSlidy>
                      </div>
                    ) : (
                      <div className="w-full ">
                        <ResponsivePlayer url={post?.Media[0]?.original} autoplay={true} muted={true} volume={1} />
                      </div>
                    )}
                  </div>

                  <div className="w-full lg:w-[35%] h-[70vh] lg:h-[100vh] bg-white">
                    <div className="px-4 py-2">
                      <div className="flex items-center mb-2">
                        <img
                          src={post?.User?.profilePicture}
                          className="w-[38px] h-[38px] mask mask-squircle object-cover mr-2"
                          alt={"_profile" + post?.User?.firstName}
                        />
                        <div className="">
                          <Link to={"../../profile/" + post?.User?.id} className="font-semibold hover:text-primary">
                            {post?.User?.firstName + " " + post?.User?.lastName}{" "}
                            <span className="text-gray-800 font-normal">{" posted an update"}</span>
                          </Link>
                          <div className="">
                            <span className="text-sm">{format(new Date(post?.createdAt), "MMM dd, yyyy")}</span>{" "}
                            <span className="">{" • Public"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start pb-2">
                        <button className="mr-2 font-semibold text-xs hover:text-primary">Delete</button>
                        <button className="ml-2 font-semibold text-xs hover:text-primary">Edit</button>
                        <button className="ml-2 font-semibold text-xs hover:text-primary">Download original</button>
                      </div>
                      {post?.amountOfReactions !== 0 || post?.amountOfComments !== 0 ? (
                        <div className="flex flex-nowrap lg:mt-0 lg:pt-0 pb-3 border-b">
                          <div>
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
                                            <img height={18} width={18} src={koremPNG} alt="_kore" />
                                            {/* <koremPNG width={18} height={18} className="text-black" /> */}
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
                      <div className="w-full h-[1px] bg-gray-200"></div>
                      <div className="">
                        <CommentForm PostId={post?.id} />
                      </div>
                      <CommentList height={" h-[68vh]"} showAll={true} postId={post?.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
            {"Sorry, This page is not available. "}{" "}
            <Link className="text-secondary hover:text-primary" to={"../../"}>
              Return to activity
            </Link>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewPhoto;
