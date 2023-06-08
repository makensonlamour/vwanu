import React from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputDiscussion from "../Community/DiscussionTab/InputDiscussion";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";
import { format } from "date-fns";

const ViewDiscussion = ({ data = [], type = "forum", CategoryId = "", isLoading, isError, hasNextPage, fetchNextPage }) => {
  const id = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function reloadPage() {
    queryClient.refetchQueries(["community", "discussion", "all"]);
  }
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl w-full py-5">
        <div className="flex justify-between items-center">
          <p className="px-5 text-sm lg:text-lg font-semibold align-center text-primary">All Discussions</p>
          <div className="flex justify-end px-4 items-center lg:px-6">
            {/* <button className="w-fit bg-white py-1 lg:py-2 px-2 lg:px-6 border border-gray-200 rounded-lg hover:bg-primary hover:text-white mr-2">
              Subscribe
            </button> */}
            <InputDiscussion
              labelBtn={"New Discussion"}
              communityId={id}
              data={{}}
              type="new"
              isForum={type === "forum" ? true : false}
              CategoryId={type === "forum" ? CategoryId : ""}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        <div className="">
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
          ) : data?.pages && data?.pages?.length > 0 && data?.pages[0]?.data?.total > 0 ? (
            <InfiniteScroll
              fetchMore={fetchNextPage}
              isError={isError}
              isLoading={isLoading}
              hasNext={hasNextPage}
              refetch={() => queryClient.invalidateQueries(["community", "discussion", "all"])}
              container={true}
              classNameContainer={"overflow-y-auto scrollbar h-fit max-h-[46vh]"}
              loader={
                <div className="flex justify-center py-5">
                  <Loader color="black" />
                </div>
              }
              errorRender={
                <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                  {"There was an error while fetching the data. "}{" "}
                  <Link
                    className="text-secondary hover:text-primary"
                    to={""}
                    onClick={() => reloadPage(["community", "discussion", "all"])}
                  >
                    Tap to retry
                  </Link>{" "}
                </div>
              }
            >
              {console.log(data)}
              {data &&
                data?.pages?.map((page) => {
                  return page?.data?.data?.map((item) => {
                    return (
                      <div
                        onClick={() => navigate(type === "forum" ? `./${item?.id}` : `.?idD=${item?.id}`)}
                        key={item?.title}
                        className="hover:shadow-lg cursor-pointer"
                      >
                        <div className="flex justify-between lg:px-6 px-4 lg:py-3 py-2">
                          <div className="flex justify-between ">
                            <div className="mr-4">
                              <img alt={item?.title} src={item?.User?.profilePicture} className="w-12 h-12 mask mask-squircle" />
                            </div>
                            <div className="">
                              <Link
                                to={type === "forum" ? `./${item?.id}` : `.?idD=${item?.id}`}
                                className="font-semibold hover:text-primary"
                              >
                                {item?.title}
                              </Link>
                              <p className="pt-2 text-sm text-gray-500">
                                {item?.lastComment && (
                                  <span className="">
                                    {item?.lastComment?.commenterFirstName +
                                      " " +
                                      item?.lastComment?.commenterLastName +
                                      " replied on " +
                                      item?.lastComment && format(new Date(item?.lastComment?.createdAt), "MMM dd, yyyy")}
                                  </span>
                                )}
                                {!item?.lastComment && (
                                  <span className="">
                                    {item?.User?.firstName + " " + item?.User?.lastName + " created on " + item?.createdAt &&
                                      format(new Date(item?.createdAt), "MMM dd, yyyy")}
                                  </span>
                                )}
                                <span className="mx-2">
                                  {" " + item?.activeParticipants === 0
                                    ? "0 Member"
                                    : item?.activeParticipants > 1
                                    ? item?.activeParticipants + " Members"
                                    : item?.activeParticipants + " Member"}
                                </span>
                                •
                                <span className="mx-2">
                                  {" " + item?.amountOfComments === 0
                                    ? "0 Reply"
                                    : item?.amountOfComments > 1
                                    ? item?.amountOfComments + " Replies"
                                    : item?.amountOfComments + " Reply"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })}
            </InfiniteScroll>
          ) : (
            <div className="flex justify-center">
              <EmptyComponent
                border={false}
                icon={<ImSad size={"32px"} className="" />}
                placeholder={"Sorry, There were no discussions found."}
                tips={"You can be the first to ccreate a discussion in this forum by clicking on the new discussion button."}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ViewDiscussion.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  CategoryId: PropTypes.string,
};

export default ViewDiscussion;
