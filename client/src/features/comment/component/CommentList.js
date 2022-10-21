/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { Facebook } from "react-content-loader";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
// import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useGetCommentList } from "../../comment/commentSlice";
import { useCreateReaction, useDeleteReaction } from "../../reaction/reactionSlice";
import Loader from "../../../components/common/Loader";
import CommentForm from "./CommentForm";
import koremPNG from "../../../assets/images/reactions/korem2.png";
import CommentSingle from "./CommentSingle";
import ResponseList from "./ResponseList";
import ViewLikeButton from "../../reaction/component/ViewLikeButton";

const CommentList = ({ postId, showAll, height = "h-[46vh]" }) => {
  const queryClient = useQueryClient();
  const [isResponse, setIsResponse] = useState(false);
  const [idResponse, setIdResponse] = useState(false);

  const createReaction = useCreateReaction(["comments", "all"], (oldData, newData) => [...oldData, newData]);
  const deleteReaction = useDeleteReaction(["comments", "all"]);

  function reloadPage() {
    queryClient.refetchQueries(["comments", "all"]);
  }

  const {
    data: commentList,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetCommentList(["comments", "all", postId], postId !== undefined ? true : false, postId);

  // const {
  //   data: responseList,
  //   isError: errorResponse,
  //   isLoading: loadingResponse,
  //   fetchNextPage: fetchNextPageResponse,
  //   hasNextPage: hasNextPageResponse,
  // } = useGetCommentList(["response", "all", idResponse], idResponse ? true : false, idResponse);

  const handleReaction = async (_post) => {
    if (_post && _post?.isReactor?.length === 1) {
      await deleteReaction.mutateAsync({ id: _post?.isReactor[0]?.id });
      queryClient.invalidateQueries(["post", _post?.id]);
    } else {
      await createReaction.mutateAsync({ content: "like", entityId: _post?.id, entityType: "Post" });
      queryClient.invalidateQueries(["post", _post?.id]);
    }

    // queryClient.invalidateQueries(["post", "home"]);
  };

  return (
    <>
      {isLoading ? (
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
      ) : commentList?.pages && commentList?.pages?.length && commentList?.pages[0]?.data?.total > 0 ? (
        showAll ? (
          <InfiniteScroll
            fetchMore={fetchNextPage}
            isError={isError}
            isLoading={isLoading}
            hasNext={hasNextPage}
            refetch={() => queryClient.invalidateQueries(["post", "home"])}
            container={true}
            classNameContainer={`overflow-y-auto scrollbar ${height}`}
            loader={
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            }
            errorRender={
              <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                {"There was an error while fetching the data. "}{" "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["post", "home"])}>
                  Tap to retry
                </Link>{" "}
              </div>
            }
          >
            {commentList?.pages.map((page) => {
              return page?.data?.data?.map((comment, idx) => {
                return (
                  <>
                    <div key={idx} className="flex items-start pr-3 mt-3">
                      {/* <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" /> */}
                      {/* extra div for flex of comment text div and the three dots  */}
                      <CommentSingle key={idx} comment={comment} PostId={postId} />
                    </div>
                    <div className="ml-12 flex items-starts justify-start">
                      <div
                        onClick={() => {
                          setIdResponse(comment?.id);
                          setIsResponse(!isResponse);
                        }}
                        className="text-xs mx-1 hover:text-primary cursor-pointer"
                      >
                        reply
                      </div>
                      <div
                        onClick={() => handleReaction(comment)}
                        className={`${
                          comment?.isReactor && comment?.isReactor[0]?.id
                            ? "text-primary font-semibold text-xs mx-1 hover:text-primary cursor-pointer"
                            : "text-xs mx-1 hover:text-primary cursor-pointer"
                        }`}
                      >
                        kore
                      </div>
                      {comment?.amountOfReactions > 0 && (
                        <div className="text-xs mx-1 hover:text-primary cursor-pointer flex items-center bg-gray-200 rounded-2xl px-1 py-1 text-primary">
                          <img height={14} width={14} src={koremPNG} alt="_kore" />
                          <span className="ml-1">{comment?.amountOfReactions}</span>
                        </div>
                      )}
                    </div>
                    {isResponse && idResponse === comment?.id && <CommentForm response={true} PostId={comment?.id} />}
                    {/* Response */}

                    {comment?.amountOfComments > 0 && <ResponseList postId={comment?.id} response={false} />}
                  </>
                );
              });
            })}
          </InfiniteScroll>
        ) : (
          <>
            {commentList?.pages.map((page) => {
              return page?.data?.data?.map((comment, idx) => {
                return idx < 3 ? (
                  <div key={idx} className="pr-3 mt-3">
                    <CommentSingle key={idx} comment={comment} PostId={postId} />
                    <div className="ml-12 flex items-center justify-start">
                      <div
                        onClick={() => {
                          setIdResponse(comment?.id);
                          setIsResponse(!isResponse);
                        }}
                        className="text-xs mx-1 hover:text-primary cursor-pointer"
                      >
                        reply
                      </div>
                      <div
                        onClick={() => handleReaction(comment)}
                        className={`${
                          comment?.isReactor && comment?.isReactor[0]?.id
                            ? "text-primary font-semibold text-xs mx-1 hover:text-primary cursor-pointer"
                            : "text-xs mx-1 hover:text-primary cursor-pointer"
                        }`}
                      >
                        kore
                      </div>
                      <div>
                        <ViewLikeButton
                          amountOfReactions={comment?.amountOfReactions}
                          postId={comment?.id}
                          label={
                            <Fragment>
                              <p className="text-sm text-secondary">
                                {comment?.amountOfReactions > 0 && (
                                  <div className="text-xs mx-1 hover:text-primary cursor-pointer flex items-center bg-gray-200 rounded-2xl px-1 py-1 text-primary">
                                    <img height={14} width={14} src={koremPNG} alt="_kore" />
                                    <span className="ml-1">{comment?.amountOfReactions}</span>
                                  </div>
                                )}
                              </p>
                            </Fragment>
                          }
                        />
                      </div>
                    </div>
                    {isResponse && idResponse === comment?.id && <CommentForm response={true} PostId={comment?.id} />}
                    {/* Response */}
                    {comment?.amountOfComments > 0 && <ResponseList postId={comment?.id} response={false} />}
                  </div>
                ) : null;
              });
            })}
            {commentList?.pages[0].data?.data?.length > 3 ? (
              <>
                <div className="text-center text-sm mt-2">
                  <Link className="text-primary hover:text-secondary" to={`../../post/${postId}`}>
                    View more comments...
                  </Link>
                </div>
              </>
            ) : null}
          </>
        )
      ) : null}
    </>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
  showAll: PropTypes.bool,
  height: PropTypes.string,
};

export default CommentList;
