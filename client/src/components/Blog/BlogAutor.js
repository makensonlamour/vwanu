import React from "react";
import PropTypes from "prop-types";
import Loader from "../common/Loader";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import InfiniteScroll from "./../InfiniteScroll/InfiniteScroll";
import EmptyComponent from "../common/EmptyComponent";
import { ImSad } from "react-icons/im";
import placeholderBlog from "../../assets/images/placeholderBlog.png";
import { format } from "date-fns";

const BlogAutor = ({ data, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  function reloadPage() {
    queryClient.refetchQueries(["blog", id]);
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center w-full py-5">
          <Loader color="black" />
        </div>
      ) : isError ? (
        <div className="py-5 m-auto text-center px-2 lg:px-2">
          {"There was an error while fetching the data. "}
          <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["blog", id])}>
            Tap to retry
          </Link>
        </div>
      ) : data && data?.pages?.length > 0 && data?.pages[0]?.data?.total > 0 ? (
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["blog", id])}
          container={true}
          classNameContainer={"overflow-y-auto h-fit scrollbar max-h-[60vh] w-full"}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["blog", id])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          <div className="mt-6 flex flex-wrap justify-between !w-full space-y-4">
            {data?.pages?.map((page) => {
              return page?.data?.data?.map((blog) => {
                return (
                  <Link
                    to={"../../blogs/" + blog?.id}
                    key={blog?.id}
                    className="w-full hover:bg-gray-100 hover:rounded-xl p-1 cursor-pointer"
                  >
                    <div className="flex">
                      {blog?.coverPicture !== null ? (
                        <div className="w-[6rem]">
                          <img
                            className="object-cover mask mask-squircle w-[5rem] h-16 rounded-lg"
                            src={blog?.coverPicture}
                            alt={blog?.blogTitle}
                          />
                        </div>
                      ) : (
                        <div className="w-[6rem]">
                          <img
                            className="object-cover mask mask-squircle w-[5rem] h-16 rounded-lg"
                            src={placeholderBlog}
                            alt={blog?.blogTitle}
                          />
                        </div>
                      )}
                      <div className="space-y-1 w-full ml-1">
                        <Link to={"../../blogs/" + blog?.id} className=" font-semibold text-primary hover:text-secondary">
                          {blog?.blogTitle}
                        </Link>
                        <p className=" text-gray-400 text-xs">{blog && format(new Date(blog?.createdAt), "MMM dd, yyyy hh:mm aaaa")}</p>
                      </div>
                    </div>
                  </Link>
                );
              });
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center w-full">
          <EmptyComponent
            border={false}
            icon={<ImSad size={"32px"} className="" />}
            placeholder={"Sorry, This autor didn't have any other blogs."}
            tips={""}
          />
        </div>
      )}
    </div>
  );
};

BlogAutor.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

export default BlogAutor;
