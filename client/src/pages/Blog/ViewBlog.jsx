/*eslint-disable*/
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog, useGetBlogListByInterest } from "../../features/blog/blogSlice";
// import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
import { GoComment } from "react-icons/go";
import SingleBlogRelated from "../../components/Blog/SingleBlogRelated";
import SingleResponse from "../../components/Blog/SingleResponse";
import { useCreateResponse, useGetAllResponse } from "../../features/blog/blogSlice";
import { FaBlog } from "react-icons/fa";
import { useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
// import SocialMediaShare from "../../components/common/SocialMediaShare";
import EmptyComponent from "../../components/common/EmptyComponent";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";
import Share from "../../components/Share/Share";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import { format } from "date-fns";
import placeholderBlog from "../../assets/images/placeholderBlog.png";

export const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

const responseSuccess = () =>
  toast.success("Response submitted successfully!", {
    position: "top-center",
  });

const responseError = () =>
  toast.error("Sorry. Error on creating Response!", {
    position: "top-center",
  });

const ViewBlog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const queryClient = useQueryClient();
  const { data: blog } = useGetBlog(["blog", "", id], id?.toString() !== undefined ? true : false, id);

  var randomItem =
    blog !== undefined && blog?.Interests !== null ? blog?.Interests[Math.floor(Math.random() * blog?.Interests?.length)] : undefined;

  const { data: blogList } = useGetBlogListByInterest(["blog", "related"], randomItem !== undefined ? true : false, randomItem?.name);
  const {
    data: listResponse,
    isLoading: responseLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetAllResponse(["blog", "response", "all"], id?.toString() !== "undefined" ? true : false, id, 3);
  const createResponse = useCreateResponse(["blog", "response", "all"]);

  const handleChange = (e) => {
    setResponseText(e.target.value);
  };

  const handleResponse = async () => {
    setIsLoading(true);

    try {
      const dataObj = {
        BlogId: id,
        responseText,
      };

      await createResponse.mutateAsync(dataObj);

      queryClient.invalidateQueries(["blog", "response", "all"]);
      setResponseText("");
      responseSuccess();
    } catch (e) {
      console.log(e);
      responseError();
    } finally {
      setIsLoading(false);
      setResponseText("");
    }
  };

  function reloadPage() {
    queryClient.refetchQueries(["blog", "all"]);
  }

  let content;

  if (responseLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (listResponse?.pages?.length > 0 && listResponse?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <div className="flex flex-wrap lg:justify-start py-2 w-full">
          {listResponse?.pages?.map((page) => {
            return page?.data?.data?.map((blog) => {
              return <SingleResponse key={blog?.id} blog={blog} />;
              // return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
            });
          })}
          {hasNextPage && (
            <div className="flex justify-center hover:text-primary pt-2 w-full cursor-pointer" onClick={() => fetchNextPage()}>
              <p className="">{"View mores..."}</p>
            </div>
          )}
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    content = (
      <div className="flex justify-center w-full mt-4">
        <EmptyComponent
          icon={<FaBlog size={"32px"} className="" />}
          placeholder={"There's no blog published yet."}
          tips={"Here, Be the first one to create a blog by just click on the button Create New Article."}
        />
      </div>
    );
  }

  // function reloadPage() {
  //   queryClient.refetchQueries(["blog", "all"]);
  // }
  // if (responseLoading) {
  //   content = (
  //     <div className="flex justify-center py-5">
  //       <Loader color="black" />
  //     </div>
  //   );
  // } else if (listResponse?.pages?.length > 0 && listResponse?.pages[0]?.data?.total > 0) {
  //   content = (
  //     <>
  //       <InfiniteScroll
  //         fetchMore={fetchNextPage}
  //         isError={isError}
  //         isLoading={responseLoading}
  //         hasNext={hasNextPage}
  //         container={false}
  //         classNameContainer={"overflow-y-auto scrollbar h-fit max-h-[60vh]"}
  //         refetch={() => queryClient.invalidateQueries(["blog"])}
  //         loader={
  //           <div className="flex justify-center py-5">
  //             <Loader color="black" />
  //           </div>
  //         }
  //         errorRender={
  //           <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
  //             {"There was an error while fetching the data. "}{" "}
  //             <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["blog", "all"])}>
  //               Tap to retry
  //             </Link>{" "}
  //           </div>
  //         }
  //       >
  //         <div className="flex flex-wrap lg:justify-start py-2 w-full">
  //           {listResponse?.pages?.map((page) => {
  //             return page?.data?.data?.map((blog) => {
  //               return <SingleResponse key={blog?.id} blog={blog} />;
  //               // return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
  //             });
  //           })}
  //         </div>
  //       </InfiniteScroll>
  //     </>
  //   );
  // } else if (isError) {
  //   content = (
  //     <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
  //       {"Failed to load post. "}{" "}
  //       <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
  //         Reload the page
  //       </Link>{" "}
  //     </div>
  //   );
  // } else {
  //   content = (
  //     <div className="flex justify-center w-full">
  //       <EmptyComponent
  //         icon={<FaBlog size={"32px"} className="" />}
  //         placeholder={"There's no blog published yet."}
  //         tips={"Here, Be the first one to create a blog by just click on the button Create New Article."}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <Toaster />
      <div className="mb-10 md:max-w-[600px] md:mx-auto lg:max-w-[1450px]">
        <div className="w-full">
          {blog?.coverPicture !== null ? (
            <div className="w-full">
              <img src={blog?.coverPicture} alt={"_coverPicture"} className="w-full object-cover h-64 lg:h-96" />
            </div>
          ) : (
            <div className="w-full">
              <img src={placeholderBlog} alt={"_coverPicture"} className="w-full object-cover h-64 lg:h-96" />
            </div>
          )}
          {blog?.Interests?.length > 0 && (
            <div className="px-4 lg:px-28 mt-5 lg:mt-6">
              <Stack direction="row" spacing={1}>
                {blog?.Interests?.length > 0 &&
                  blog?.Interests?.map((interest) => {
                    return <Chip key={interest?.id} label={interest?.name} size="small" />;
                  })}
              </Stack>
            </div>
          )}
          <div className="mt-2 lg:mt-4 px-4 lg:px-28">
            <p className="text-md lg:text-lg font-semibold">{blog?.blogTitle}</p>
          </div>
          <div className="mt-4 lg:mt-6 px-4 lg:px-28">
            <div className="flex mt-7 mb-4 justify-between items-center">
              <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  src={blog?.User?.profilePicture}
                  alt={"img_" + blog?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left text-md">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                  <p className="text-gray-400 text-sm">{blog && format(new Date(blog?.createdAt), "MMM dd, yyyy hh:mm aaaa")}</p>
                </div>
              </Link>
              <div className="">
                <Link to={`#responses`} className="text-md px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center align-middle">
                  <GoComment size={"18px"} className="mr-2 inline align-middle" />{" "}
                  {blog?.amountOfComments <= 1 ? blog?.amountOfComments + " Comment" : blog?.amountOfComments + " Comments"}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-3 lg:mt-4 px-4 lg:px-28">
            <div className="view ql-editor" dangerouslySetInnerHTML={{ __html: blog?.blogText }}></div>
            {/* <p className="">{parse(`${blog?.blogText}`)}</p> */}
          </div>
          <div className="mt-3 lg:mt-4 px-4 lg:px-28">
            <Share post={blog} label={" Share"} link={""} type="blog" />
          </div>

          <div className="mt-6 lg:mt-10 lg:px-28">
            <div className="border-t border-gray-300 my-5">
              <p className="px-4 lg:px-0 text-lg lg:text-lg font-semibold pt-3 lg:pt-3">
                {blog?.amountOfComments < 1 ? blog?.amountOfComments + " Response" : blog?.amountOfComments + " Responses"}
              </p>
              <div
                id="responses"
                className="mx-auto bg-white border border-gray-300 rounded-xl p-4 mt-4 lg:mt-4 flex flex-col justify-center"
              >
                <Link to={"../../profile/" + blog?.User?.id} className="py-2 lg:py-2 flex items-center">
                  <img
                    src={blog?.User?.profilePicture}
                    alt={"_img_" + blog?.User?.firstName}
                    className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  />
                  <p className="text-md font-[500] ml-3 hover:text-primary">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                </Link>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-4 mt-2 h-28"
                  rows={"8"}
                  name="responseText"
                  onChange={handleChange}
                  value={responseText}
                  placeholder="Write a response..."
                ></textarea>
                <button
                  onClick={() => {
                    handleResponse();
                  }}
                  className="ml-auto px-6 py-1 bg-primary text-white hover:bg-secondary rounded-lg mt-4"
                >
                  {isLoading ? "Loading..." : "Publish"}
                </button>
              </div>
              <div className="mx-2 lg:mx-0 w-full">{content}</div>
            </div>
          </div>
          <div className="mt-4 lg:mt-5 px-4 lg:px-28">
            <div className="">
              <p className="text-lg lg:text-lg font-semibold pb-5 lg:pb-10">Related Articles</p>
              <div className="flex justify-start lg:justify-between flex-wrap">
                {blogList &&
                  blogList?.pages &&
                  blogList?.pages[0]?.data?.total > 0 &&
                  blogList?.pages[0]?.data?.data?.map((blog, idx) => {
                    if (idx < 2) {
                      return (
                        <div key={blog?.id} className="w-[100%] lg:w-[48%]">
                          <SingleBlogRelated blog={blog} />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
