import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CommentForm from "../../comment/component/CommentForm";
import _ from "lodash";
import VideoPlayer from "react-videoplayer";
import "video-react/dist/video-react.css";
import { useScrollLock } from "@mantine/hooks";
import ReactSlidy from "react-slidy";
import Reaction from "../../reaction/component/Reaction";
import Share from "../../../components/Share/Share";
import ViewLikeButton from "../../reaction/component/ViewLikeButton";
import koremPNG from "../../../assets/images/reactions/korem2.png";

const ViewPhoto = ({ photo, data = {}, imgComponent, type = "photo", pageTitle = "post" }) => {
  // const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const [commentPrev, setCommentPrev] = useState(false);
  // const { data: listComment } = useGetComment(["comments", "all", photo?.id], photo?.id !== "undefined" ? true : false, photo?.id);

  useEffect(() => {
    if (showModal) {
      setScrollLocked(true);
    } else {
      setScrollLocked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="w-full">
        <div className="w-full">{imgComponent}</div>
      </button>
      {showModal && (
        <div
          open={showModal}
          className="justify-center flex overflow-x-hidden overflow-y-auto scrollbar fixed bg-black bg-opacity-[0.95] h-full w-full z-50 outline-none focus:outline-none"
        >
          <div className="relative w-full ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              <div className="flex justify-between flex-col md:flex-row w-full">
                <div className="flex justify-center w-full lg:py-5">
                  <div className="flex items-start justify-start border-solid">
                    <button onClick={() => setShowModal(false)} className="text-3xl text-white font-medium px-2 lg:pl-2">
                      x
                    </button>
                  </div>
                  {type === "photo" ? (
                    <div className="w-full lg:w-[80%] h-auto lg:h-[90vh] flex items-center justify-center bg-black pt-10 pb-5 lg:py-5">
                      <ReactSlidy imageObjectFit="contain">
                        {data?.Media?.map((item) => {
                          return (
                            <img
                              key={item?.original}
                              alt={"_img"}
                              className="px-2 lg:px-5 bg-black mx-auto object-contain"
                              style={{ maxHeight: "100vh" }}
                              src={item?.original}
                            />
                          );
                        })}
                      </ReactSlidy>
                      {/* <img src={photo?.original} className="px-5 bg-black mx-auto object-contain max-h-[97vh]" alt={"_img_" + photo?.id} /> */}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full lg:w-[80%] h-[90vh]">
                      <VideoPlayer
                        className={"rounded-lg"}
                        videoSrc={photo?.original}
                        autoPlay={true}
                        muted={true}
                        videoVolume={100}
                        defaultBrowserControls={true}
                        customHtmlControls={false}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-[35%] h-[70vh] lg:h-[100vh] bg-white">
                  <div className="px-4 py-2">
                    <div className="flex items-center mb-2">
                      <img
                        src={data?.User?.profilePicture}
                        className="w-[38px] h-[38px] mask mask-squircle object-cover mr-2"
                        alt={"_profile" + data?.User?.firstName}
                      />
                      <div className="">
                        <Link to={"../../profile/" + data?.User?.id} className="font-semibold hover:text-primary">
                          {data?.User?.firstName + " " + data?.User?.lastName}{" "}
                          <span className="text-gray-800 font-normal">{" posted an update"}</span>
                        </Link>
                        <div className="">
                          <span className="text-sm">{format(new Date(photo?.createdAt), "MMM dd, yyyy")}</span>{" "}
                          <span className="">{" • Public"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start pb-2">
                      <button className="mr-2 font-semibold text-xs hover:text-primary">Delete</button>
                      <button className="ml-2 font-semibold text-xs hover:text-primary">Edit</button>
                      <button className="ml-2 font-semibold text-xs hover:text-primary">Download original</button>
                    </div>
                    {data?.amountOfReactions !== 0 || data?.amountOfComments !== 0 ? (
                      <div className="flex flex-nowrap lg:mt-5 lg:pt-2 pb-3 border-b">
                        <div>
                          <ViewLikeButton
                            amountOfReactions={data?.amountOfReactions}
                            postId={data?.id}
                            label={
                              <Fragment>
                                <p className="text-sm text-secondary">
                                  {data?.amountOfReactions > 0 ? (
                                    <>
                                      <div className="flex text-primary items-center">
                                        <p className="flex justify-start items-center">
                                          <img height={18} width={18} src={koremPNG} alt="_kore" />
                                          {/* <koremPNG width={18} height={18} className="text-black" /> */}
                                          <span className="ml-1">
                                            {data?.isReactor && data?.isReactor?.length === 1
                                              ? data?.amountOfReactions - 1 === 0
                                                ? "You react on this post"
                                                : "You and "
                                              : null}
                                          </span>
                                          <span>
                                            {
                                              data?.amountOfReactions === 0
                                                ? null
                                                : data?.amountOfReactions > 1 && data?.isReactor?.length === 1
                                                ? data?.amountOfReactions - 1 + " other people" //I like and more than one like the post
                                                : data?.isReactor && data?.isReactor?.length - 1 === 0
                                                ? null
                                                : data?.amountOfReactions + " other people" //I don't like and other people like
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
                            to={_.isEqual(pageTitle, "post") || _.isEqual(pageTitle, "profilefeed") ? "" : `../../post/${data?.id}`}
                            className="ml-auto text-xs text-primary mr-2 hover:border-b hover:border-primary"
                          >
                            {data?.amountOfComments === 0
                              ? null
                              : data?.amountOfComments === 1
                              ? data?.amountOfComments + " Comment"
                              : data?.amountOfComments + " Comments"}
                          </Link>
                          <button className="ml-auto text-xs text-primary hover:border-b hover:border-primary">
                            {data?.Shares?.length ? data?.Shares?.length + " shares" : null}
                          </button>
                        </p>
                      </div>
                    ) : null}
                    <div className="flex flex-wrap">
                      {/*Reactions*/}
                      <Reaction post={data} />

                      {/*Comments*/}
                      <button
                        onClick={() => setCommentPrev(!commentPrev)}
                        className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
                      >
                        {" Comment"}
                      </button>
                      <Share post={data} label={" Share"} link={""} />
                    </div>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="">
                      <CommentForm PostId={data?.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ViewPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  imgComponent: PropTypes.any,
  type: PropTypes.string,
  data: PropTypes.object,
  idxImg: PropTypes.number,
  pageTitle: PropTypes.string,
};

export default ViewPhoto;
