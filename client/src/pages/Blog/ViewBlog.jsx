import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog, useGetBlogList } from "../../features/blog/blogSlice";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
import { GoComment } from "react-icons/go";
import SingleBlogRelated from "../../components/Blog/SingleBlogRelated";
import SingleResponse from "../../components/Blog/SingleResponse";
import { useCreateResponse, useGetAllResponse } from "../../features/blog/blogSlice";

const ViewBlog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const { data: blog } = useGetBlog(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  const { data: blogList } = useGetBlogList(["blog", "all"], true);
  const { data: listResponse } = useGetAllResponse(["blog", "response", "all"], id?.toString() !== "undefined" ? true : false, id);
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

      let result = await createResponse.mutateAsync(dataObj);

      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setResponseText("");
    }
  };

  return (
    <>
      <div className="mb-10 md:max-w-[600px] md:mx-auto lg:max-w-[1450px]">
        <div className="w-full">
          <div className="w-full">
            <img src={blog?.data?.coverPicture} alt={"_coverPicture"} className="w-full object-cover h-64 lg:h-96" />
          </div>
          {blog?.data?.Interests?.length > 0 && (
            <div className="px-4 lg:px-28 mt-5 lg:mt-6">
              <Stack direction="row" spacing={1}>
                {blog?.data?.Interests?.length > 0 &&
                  blog?.data?.Interests?.map((interest) => {
                    return <Chip key={interest?.id} label={interest?.name} size="small" />;
                  })}
              </Stack>
            </div>
          )}
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="text-md lg:text-2xl font-semibold">{blog?.data?.blogTitle}</p>
          </div>
          <div className="mt-6 lg:mt-10 px-4 lg:px-28">
            <div className="flex mt-7 mb-4 justify-between items-center">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  src={blog?.data?.User?.profilePicture}
                  alt={"img_" + blog?.data?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left text-md">{blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}</p>
                  <p className="text-gray-400 text-sm">{blog?.data?.createdAt}</p>
                </div>
              </Link>
              <div className="">
                <Link to={`#`} className="text-md px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center">
                  <GoComment size={"18px"} className="mr-2 inline" /> {blog?.data?.Response?.length} Comments
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="">{parse(`${blog?.data?.blogText}`)}</p>
          </div>
          <div className="mt-10 lg:px-28">
            <div className="border-b border-t border-gray-300">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="px-4 py-2 lg:py-10 flex items-center">
                <img
                  src={blog?.data?.User?.profilePicture}
                  alt={"_img_" + blog?.data?.User?.firstName}
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                />
                <p className="text-md lg:text-lg font-semibold ml-3 hover:text-primary">
                  {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-4 lg:mt-5 px-4 lg:px-28">
            <div className="">
              <p className="text-lg lg:text-2xl font-semibold pb-5 lg:pb-10">Related Articles</p>
              <div className="flex justify-start lg:justify-between flex-wrap">
                {blogList?.data?.length > 0 &&
                  blogList?.data?.map((blog, idx) => {
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
              <p className="px-4 lg:px-0 text-lg lg:text-2xl font-semibold pt-3 lg:pt-0">Responses</p>
              <div className="bg-white border border-gray-300 rounded-xl m-2 p-4 mt-4 lg:mt-6 flex flex-col justify-end">
                <Link to={"../../profile/" + blog?.data?.User?.id} className="py-2 lg:py-4 flex items-center">
                  <img
                    src={blog?.data?.User?.profilePicture}
                    alt={"_img_" + blog?.data?.User?.firstName}
                    className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  />
                  <p className="text-md font-[500] ml-3 hover:text-primary">
                    {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                  </p>
                </Link>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-4 mt-3 h-28"
                  row={"8"}
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
