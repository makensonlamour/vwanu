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
import ViewLikeButton from "../../reaction/component/ViewLikeButton";

const ResponseList = ({ postId, response = false }) => {
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

  const handleReaction = async (_post) => {
    if (_post && _post?.isReactor?.length === 1) {
      await deleteReaction.mutateAsync({ id: _post?.isReactor[0]?.id });
      queryClient.invalidateQueries(["post", _post?.id]);
    } else {
      await createReaction.mutateAsync({ content: "like", entityId: _post?.id, entityType: "Post" });
      queryClient.invalidateQueries(["post", _post?.id]);
    }
  };

  return (
    <div className="pl-10 mt-2">
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
        <div>
          {commentList?.pages.map((page) => {
            return page?.data?.data?.map((comment, idx) => {
              return (
                <>
                  <div key={idx} className="flex items-start pr-3">
                    {/* extra div for flex of comment text div and the three dots  */}
                    <CommentSingle response={true} key={idx} comment={comment} PostId={postId} />
                  </div>
                  <div className="ml-12 flex items-starts justify-start pb-2">
                    {response && (
                      <div
                        onClick={() => {
                          setIdResponse(comment?.id);
                          setIsResponse(!isResponse);
                        }}
                        className="text-xs mx-1 hover:text-primary cursor-pointer"
                      >
                        reply
                      </div>
                    )}
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
                    {/* {comment?.amountOfReactions > 0 && (
                      <div className="text-xs mx-1 hover:text-primary cursor-pointer flex items-center bg-gray-200 rounded-2xl px-1 py-1 text-primary">
                        <img height={14} width={14} src={koremPNG} alt="_kore" />
                        <span className="ml-1">{comment?.amountOfReactions}</span>
                      </div>
                    )} */}
                  </div>

                  {isResponse && idResponse === comment?.id && <CommentForm response={true} PostId={comment?.id} />}
                </>
              );
            });
          })}
          {hasNextPage ? (
            <>
              <div className="text-left text-xs mt-1">
                <Link className="text-primary text-xs hover:text-secondary" to={``} onClick={() => fetchNextPage()}>
                  View more...
                </Link>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

ResponseList.propTypes = {
  postId: PropTypes.string.isRequired,
  response: PropTypes.bool,
};

export default ResponseList;
