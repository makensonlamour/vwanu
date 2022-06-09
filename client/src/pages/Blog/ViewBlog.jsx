import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog } from "../../features/blog/blogSlice";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
const ViewBlog = () => {
  const { id } = useParams();
  const { data: blog } = useGetBlog(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  console.log(blog);
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
                <Link to={`./${blog?.id}`} className="px-4 py-2 hover:bg-placeholder-color rounded-lg">
                  {blog?.data?.Response?.length} Comments
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 px-40">
            <p className="">{parse(`${blog?.data?.blogText}`)}</p>
          </div>
          <div className="mt-10 px-40">
            <div className="">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="py-10 ">
                <img
                  src={blog?.data?.User?.profilePicture}
                  alt={"_img_" + blog?.data?.User?.firstName}
                  className="w-[3rem] h-[3rem] mask mask-squircle"
                />
                <span className="">{blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}</span>
              </Link>
            </div>
          </div>
          <div className="mt-10 px-40">
            <div className="">
              <p className="text-2xl font-semibold">Related Articles</p>
            </div>
          </div>
          <div className="mt-10 px-40">
            <div className="">
              <p className="text-2xl font-semibold">Responses</p>
              <div className="bg-white rounded-xl p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
