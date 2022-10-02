import React from "react";
// import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import SingleBlogRelated from "../Blog/SingleBlogRelated";
import { useGetMyBlogList } from "../../features/blog/blogSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../components/common/EmptyComponent";
import Loader from "../../components/common/Loader";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";

const BlogTab = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const {
    data: blogList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetMyBlogList(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  function reloadPage() {
    queryClient.refetchQueries(["user", "photos"]);
  }

  return (
    <>
      <div className=" my-4 bg-white border border-gray-300 py-5 md:py-10 px-2 md:px-16 rounded-xl">
        <div className="flex justify-between items-center pb-4">
          <h4 className="text-lg md:text-xl font-semibold">Blog</h4>
          <Link
            to={"../../blogs/add"}
            className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-1 md:py-2 px-4 md:px-6 font-semibold"
          >
            Create Blog
          </Link>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            {isLoading ? (
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            ) : isError ? (
              <div className="py-5 m-auto text-center px-2 lg:px-2">
                {"There was an error while fetching the data. "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "photos"])}>
                  Tap to retry
                </Link>
              </div>
            ) : blogList?.pages?.length > 0 && blogList?.pages[0]?.data?.total > 0 ? (
              <InfiniteScroll
                fetchMore={fetchNextPage}
                isError={isError}
                isLoading={isLoading}
                hasNext={hasNextPage}
                refetch={() => queryClient.invalidateQueries(["user", "photos"])}
                container={true}
                classNameContainer={"overflow-y-auto h-[60vh] w-full"}
                loader={
                  <div className="flex justify-center py-5">
                    <Loader color="black" />
                  </div>
                }
                errorRender={
                  <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                    {"There was an error while fetching the data. "}{" "}
                    <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "photos"])}>
                      Tap to retry
                    </Link>{" "}
                  </div>
                }
              >
                {blogList?.pages?.map((page) => {
                  return page?.data?.data?.map((blog) => {
                    return (
                      <div key={blog?.id} className="w-[48%]">
                        <SingleBlogRelated blog={blog} />
                      </div>
                    );
                  });
                })}
              </InfiniteScroll>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyComponent
                  border={false}
                  icon={<ImSad size={"32px"} className="" />}
                  placeholder={"Sorry, You don't have any pending request."}
                  tips={""}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTab;
