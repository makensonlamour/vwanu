import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link, useOutletContext } from "react-router-dom";
import MenuPost from "./../../post/components/MenuPost";
// import { Facebook } from "react-content-loader";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
// import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useGetCommentList } from "../../comment/commentSlice";
import Loader from "../../../components/common/Loader";
import CommentForm from "./CommentForm";
import koremPNG from "../../../assets/images/reactions/korem2.png";

const CommentList = ({ postId, showAll }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const [isResponse, setIsResponse] = useState(false);
  const [idResponse, setIdResponse] = useState(false);

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
            classNameContainer={"overflow-y-auto h-[46vh]"}
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
                      <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" />
                      {/* extra div for flex of comment text div and the three dots  */}
                      <div className="flex items-start flex-shrink">
                        <div className={`px-4 py-2 bg-gray-100 rounded-3xl items-center`}>
                          <div className="flex justify-between space-x-6">
                            <Link to={`../../profile/${comment?.User?.id}`} className="text-secondary text-sm">
                              {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                            </Link>
                            <span className="text-gray-500 font-light text-right">
                              {formatDistance(parseISO(comment?.createdAt), new Date(), [
                                {
                                  includeSeconds: true,
                                },
                              ])}
                            </span>
                            {user?.id === comment?.User?.id && <MenuPost post={comment} />}
                          </div>

                          <p className="text-gray-800 font-light" style={{ fontSize: "0.97rem" }}>
                            {comment?.postText}
                          </p>
                        </div>
                      </div>
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
                      <div className="text-xs mx-1 hover:text-primary cursor-pointer">kore</div>
                      <div className="text-xs mx-1 hover:text-primary cursor-pointer">Number of kore</div>
                    </div>
                    {isResponse && idResponse === comment?.id && <CommentForm response={true} PostId={comment?.id} />}
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
                    <div className="flex items-start pr-3 mt-3">
                      <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" />
                      {/* extra div for flex of comment text div and the three dots  */}
                      <div className="flex items-center flex-shrink">
                        <div className={`px-3 py-1 bg-gray-100 rounded-xl items-center`}>
                          <div className="flex justify-between space-x-4">
                            <Link to={`../../profile/${comment?.User?.id}`} className="font-semibold hover:text-primary text-sm">
                              {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                            </Link>
                            <span className="text-gray-500 font-light text-xs" style={{ textDecoration: "none" }}>
                              {formatDistance(parseISO(comment?.createdAt), new Date(), [
                                {
                                  includeSeconds: true,
                                },
                              ])}
                            </span>
                            <div className="">{user?.id === comment?.User?.id && <MenuPost post={comment} />}</div>
                          </div>
                          <p className="text-gray-800 font-light text-sm">{comment?.postText}</p>
                        </div>
                      </div>
                    </div>
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
                      <div className="text-xs mx-1 hover:text-primary cursor-pointer">kore</div>
                      {comment?.amountOfReactions > 0 && (
                        <div className="text-xs mx-1 hover:text-primary cursor-pointer flex items-center bg-gray-200 rounded-2xl px-1 py-1 text-primary">
                          <img height={14} width={14} src={koremPNG} alt="_kore" />
                          <span className="ml-1">{comment?.amountOfReactions}</span>
                        </div>
                      )}
                    </div>
                    {isResponse && idResponse === comment?.id && <CommentForm response={true} PostId={comment?.id} />}
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
};

export default CommentList;
