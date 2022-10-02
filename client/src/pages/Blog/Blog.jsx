/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SingleBlog from "../../components/Blog/SingleBlog";
import { useGetBlogList, useGetBlogListByInterest } from "../../features/blog/blogSlice";
import { FaBlog } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import EmptyComponent from "../../components/common/EmptyComponent";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";
import { useQueryClient } from "react-query";
import { useGetInterestList } from "./../../features/interest/interestSlice";

const Blog = () => {
  const [interest, setInterest] = useState(false);
  const { data: blogList, isError, isLoading, hasNextPage, fetchNextPage } = useGetBlogList(["blog", "all"], true);
  const {
    data: blogListInterest,
    isError: errorBlog,
    isLoading: loadingBlog,
    hasNextPage: hasNextPageBlog,
    fetchNextPage: fetchNextPageBlog,
  } = useGetBlogListByInterest(["blog", "all", interest], interest ? true : false, interest);
  const { data: interestList, isError: errorInterest, isLoading: loadingInterest } = useGetInterestList(["interest", "all"], true);

  const queryClient = useQueryClient();
  let content;
  function reloadPage(arrayQuery) {
    queryClient.refetchQueries(arrayQuery);
  }
  if (isLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (blogList?.pages?.length > 0 && blogList?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          hasNext={hasNextPage}
          container={true}
          classNameContainer={"overflow-y-auto h-[77vh]"}
          refetch={() => queryClient.invalidateQueries(["blog", "all"])}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["blog", "all"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          <div className="flex flex-wrap lg:justify-start py-2 w-full">
            {blogList?.pages?.map((page) => {
              return page?.data?.data?.map((blog) => {
                return <SingleBlog key={blog?.id} blog={blog} />;
                // return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
              });
            })}
          </div>
        </InfiniteScroll>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["blog", "all"])}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    content = (
      <div className="flex justify-center w-full">
        <EmptyComponent
          icon={<FaBlog size={"32px"} className="" />}
          placeholder={"There's no blog published yet."}
          tips={"Here, Be the first one to create a blog by just click on the button Create New Article."}
        />
      </div>
    );
  }

  //content of interest
  let contentInterest;
  if (loadingBlog) {
    contentInterest = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (blogListInterest?.pages?.length > 0 && blogListInterest?.pages[0]?.data?.total > 0) {
    contentInterest = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPageBlog}
          isError={isError}
          hasNext={hasNextPageBlog}
          container={true}
          classNameContainer={"overflow-y-auto h-[77vh]"}
          refetch={() => queryClient.invalidateQueries(["interest", "all"])}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["interest", "all"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          <div className="flex flex-wrap lg:justify-start py-2 w-full">
            {blogListInterest?.pages?.map((page) => {
              return page?.data?.data?.map((blog) => {
                return <SingleBlog key={blog?.id} blog={blog} />;
                // return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
              });
            })}
          </div>
        </InfiniteScroll>
      </>
    );
  } else if (errorBlog) {
    contentInterest = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["interest", "all"])}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    contentInterest = (
      <div className="flex justify-center w-full">
        <EmptyComponent
          icon={<FaBlog size={"32px"} className="" />}
          placeholder={"There's no blog published yet."}
          tips={"Here, Be the first one to create a blog by just click on the button Create New Article."}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 mx-2">
      <div className="flex justify-between">
        <h4 className="text-2xl font-semibold">Blog</h4>
        <Link
          to={"./add"}
          className="px-4 py-1 md:py-2 border border-gray-300  hover:bg-white rounded-xl bg-placeholder-color hover:text-black"
        >
          Create New Article
        </Link>
      </div>
      <div className="flex mt-2 gap-x-10">
        <div className="basis-[100%] lg:basis-4/6">{interest ? contentInterest : content}</div>
        <div className="basis-[100%] lg:basis-2/6 bg-white rounded-lg border border-gray-200 overflow-y-auto">
          <p className="text-center py-3 border-b border-placeholder-color font-semibold text-md">List of Interest</p>
          {loadingInterest ? (
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          ) : errorInterest ? (
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["interest", "all"])}>
                Tap to retry
              </Link>{" "}
            </div>
          ) : interestList?.length > 0 ? (
            interestList?.map((interest2) => {
              return (
                <div
                  key={interest2?.id}
                  className={`${
                    interest === interest2?.name ? "bg-placeholder-color " : ""
                  } border-b border-gray-200 p-2 cursor-pointer hover:bg-placeholder-color flex justify-between`}
                >
                  <div onClick={() => setInterest(interest2?.name)} className="w-[80%]">
                    {interest2?.name}
                  </div>
                  {interest === interest2?.name && (
                    <button className="" onClick={() => setInterest(false)}>
                      <FcCancel size={"24px"} className="" />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center w-full">
              <EmptyComponent icon={<FaBlog size={"32px"} className="" />} placeholder={"There's no interest yet."} tips={""} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
