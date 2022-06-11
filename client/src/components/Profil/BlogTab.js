/* eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, useOutletContext, Link } from "react-router-dom";
import SingleBlogRelated from "../Blog/SingleBlogRelated";
import { useGetMyBlogList } from "../../features/blog/blogSlice";

const BlogTab = () => {
  const { id } = useParams();
  const { data: blogList } = useGetMyBlogList(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  console.log(blogList);
  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <div className="flex justify-between items-center pb-4">
          <h4 className="text-xl font-semibold">Blog</h4>
          <Link
            to={"../../blogs/add"}
            className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-2 px-6 font-semibold"
          >
            Create Blog
          </Link>
        </div>
        <div className="">
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
    </>
  );
};

export default BlogTab;
