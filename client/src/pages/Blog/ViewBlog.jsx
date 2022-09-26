import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog, useGetBlogList } from "../../features/blog/blogSlice";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
import { GoComment } from "react-icons/go";
import SingleBlogRelated from "../../components/Blog/SingleBlogRelated";
import SingleResponse from "../../components/Blog/SingleResponse";
import { useCreateResponse, useGetAllResponse } from "../../features/blog/blogSlice";
import "./testcss.css";
import { useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import SocialMediaShare from "../../components/common/SocialMediaShare";

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
  const { data: blog } = useGetBlog(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  const { data: blogList } = useGetBlogList(["blog", "all"], true);
  const { data: listResponse } = useGetAllResponse(["blog", "response", "all"], id?.toString() !== "undefined" ? true : false, id);
  const createResponse = useCreateResponse(["blog", "response", "all"]);

  console.log(blog);

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

  return (
    <>
      <Toaster />
      <div className="mb-10 md:max-w-[600px] md:mx-auto lg:max-w-[1450px]">
        <div className="w-full">
          {blog?.coverPicture !== "undefined" && (
            <div className="w-full">
              <img src={blog?.coverPicture} alt={"_coverPicture"} className="w-full object-cover h-64 lg:h-96" />
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
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="text-md lg:text-2xl font-semibold">{blog?.blogTitle}</p>
          </div>
          <div className="mt-6 lg:mt-10 px-4 lg:px-28">
            <div className="flex mt-7 mb-4 justify-between items-center">
              <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  src={blog?.User?.profilePicture}
                  alt={"img_" + blog?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left text-md">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                  <p className="text-gray-400 text-sm">{blog?.createdAt}</p>
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
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="">{parse(`${blog?.blogText}`)}</p>
          </div>
          <SocialMediaShare
            className={"m-1"}
            title={blog?.blogTitle}
            quote={blog?.blogTitle}
            url={`${url}/blogs/${blog?.id}`}
            image={blog?.coverPicture}
            hashtag={`#vwanu #haitian_social_media #blog #social #haiti`}
            description={blog?.blogTitle}
            imageUrl={blog?.coverPicture}
            caption={blog?.blogText}
            media={blog?.coverPicture}
            summary={blog?.blogText}
            source={"Vwanu"}
            hashtags={["vwanu", "haitian_social_media", "blog", "social", "haiti"]}
            subject={`${blog?.blogTitle}`}
            body={`${blog?.blogText}`}
            via={"Vwanu"}
            tags={["vwanu", "haitian_social_media", " blog", "social", "haiti"]}
          />
          <div className="mt-10 lg:px-28">
            <div className="border-b border-t border-gray-300">
              <Link to={"../../profile/" + blog?.User?.id} className="px-4 py-2 lg:py-10 flex items-center">
                <img
                  src={blog?.User?.profilePicture}
                  alt={"_img_" + blog?.User?.firstName}
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                />
                <p className="text-md lg:text-lg font-semibold ml-3 hover:text-primary">
                  {blog?.User?.firstName + " " + blog?.User?.lastName}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-4 lg:mt-5 px-4 lg:px-28">
            <div className="">
              <p className="text-lg lg:text-2xl font-semibold pb-5 lg:pb-10">Related Articles</p>
              <div className="flex justify-start lg:justify-between flex-wrap">
                {blogList?.length > 0 &&
                  blogList?.map((blog, idx) => {
                    if (idx < 2) {
                      return (
                        <div key={blog?.id} className="w-[100%] lg:w-[48%]">
                          {" "}
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
          <div className="mt-6 lg:mt-10 lg:px-28">
            <div className="border-t border-gray-300 my-5">
              <p className="px-4 lg:px-0 text-lg lg:text-2xl font-semibold pt-3 lg:pt-0">
                {blog?.amountOfComments < 1 ? blog?.amountOfComments + " Response" : blog?.amountOfComments + " Responses"}
              </p>
              <div id="responses" className="bg-white border border-gray-300 rounded-xl m-2 p-4 mt-4 lg:mt-6 flex flex-col justify-end">
                <Link to={"../../profile/" + blog?.User?.id} className="py-2 lg:py-4 flex items-center">
                  <img
                    src={blog?.User?.profilePicture}
                    alt={"_img_" + blog?.User?.firstName}
                    className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  />
                  <p className="text-md font-[500] ml-3 hover:text-primary">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                </Link>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-4 mt-3 h-28"
                  rows={"8"}
                  name="responseText"
                  onChange={handleChange}
                  placeholder="Write a response..."
                ></textarea>
                <button
                  onClick={() => {
                    handleResponse();
                  }}
                  className="ml-auto px-6 py-1 bg-primary text-white hover:bg-secondary rounded-xl mt-4"
                >
                  {isLoading ? "Loading..." : "Publish"}
                </button>
              </div>
              <div className="mx-2">
                <SingleResponse blogs={listResponse?.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
