import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog, useGetBlogList } from "../../features/blog/blogSlice";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
import { GoComment } from "react-icons/go";
import SingleBlogRelated from "../../components/Blog/SingleBlogRelated";
import SingleResponse from "../../components/Blog/SingleResponse";

const ViewBlog = () => {
  const { id } = useParams();
  const { data: blog } = useGetBlog(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  const { data: blogList } = useGetBlogList(["blog", "all"], true);

  return (
    <>
      <div className="mb-10">
        <div className="w-full">
          <div className="w-full">
            <img src={blog?.data?.coverPicture} alt={"_coverPicture"} className="w-full object-cover h-96" />
          </div>
          {blog?.data?.Interests?.length > 0 && (
            <div className="px-40 mt-6">
              <Stack direction="row" spacing={1}>
                {blog?.data?.Interests?.length > 0 &&
                  blog?.data?.Interests?.map((interest) => {
                    return <Chip key={interest?.id} label={interest?.name} size="small" />;
                  })}
              </Stack>
            </div>
          )}
          <div className="mt-6 px-40">
            <p className="text-2xl font-semibold">{blog?.data?.blogTitle}</p>
          </div>
          <div className="mt-10 px-40">
            <div className="flex mt-7 mb-4 justify-between items-center">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[3rem] h-[3rem] mask mask-squircle"
                  src={blog?.data?.User?.profilePicture}
                  alt={"img_" + blog?.data?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left">{blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}</p>
                  <p className="text-gray-400">{blog?.data?.createdAt}</p>
                </div>
              </Link>
              <div className="">
                <Link to={`#`} className="px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center">
                  <GoComment size={"18px"} className="mr-2" /> {blog?.data?.Response?.length} Comments
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 px-40">
            <p className="">{parse(`${blog?.data?.blogText}`)}</p>
          </div>
          <div className="mt-10 px-40">
            <div className="border-b border-t border-gray-300">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="py-10 flex items-center">
                <img
                  src={blog?.data?.User?.profilePicture}
                  alt={"_img_" + blog?.data?.User?.firstName}
                  className="w-[3rem] h-[3rem] mask mask-squircle"
                />
                <p className="text-lg font-semibold ml-3 hover:text-primary">
                  {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-5 px-40">
            <div className="">
              <p className="text-2xl font-semibold pb-10">Related Articles</p>
              <div className="flex justify-between">
                {blogList?.data?.length > 0 &&
                  blogList?.data?.map((blog, idx) => {
                    if (idx < 2) {
                      return (
                        <div key={blog?.id} className="w-[48%]">
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
          <div className="mt-10 px-40">
            <div className="border-t border-gray-300 mt-5">
              <p className="text-2xl font-semibold">Responses</p>
              <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6 flex flex-col justify-end">
                <Link to={"../../profile/" + blog?.data?.User?.id} className="py-4 flex items-center">
                  <img
                    src={blog?.data?.User?.profilePicture}
                    alt={"_img_" + blog?.data?.User?.firstName}
                    className="w-[3rem] h-[3rem] mask mask-squircle"
                  />
                  <p className="text-md font-[500] ml-3 hover:text-primary">
                    {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                  </p>
                </Link>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-4 mt-3 h-28"
                  row={"8"}
                  placeholder="Write a response..."
                ></textarea>
                <button className="ml-auto px-6 py-1 bg-primary text-white hover:bg-secondary rounded-xl mt-4">Publish</button>
              </div>
              <div className="">
                <SingleResponse blog={blog} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
