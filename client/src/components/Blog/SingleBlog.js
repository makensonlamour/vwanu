import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Chip, Stack } from "@mui/material";

const SingleBlog = ({ blog }) => {
  return (
    <>
      <div className="bg-white shadow-sm w-full rounded-xl pb-6 mb-10">
        <div className="">
          <img className="w-full h-72 object-cover rounded-t-xl" src={blog?.image} alt="blog" />
        </div>
        <div className="px-8 mt-5">
          <Stack direction="row" spacing={1}>
            <Chip label="Technology" size="small" />
            <Chip label="Sport" size="small" />
            <Chip label="Education" size="small" />
          </Stack>
        </div>
        <div className="px-8 mt-7">
          <Link to={"#"} className="text-2xl font-semibold hover:text-primary">
            {blog?.title}
          </Link>
          <p className="mt-7 line-clamp-3">{blog?.body}</p>
          <div className="flex mt-7 mb-4 justify-between items-center">
            <button className="flex items-center hover:text-primary">
              <img
                className="w-[3rem] h-[3rem] mask mask-squircle"
                src="https://meragor.com/files/styles//ava_800_800_wm/mujiki-na-avu-028.jpg"
                alt="profile_img"
              />
              <div className="ml-4">
                <p className="font-semibold">Yves Gervens</p>
                <p className="text-gray-400">{blog?.date}</p>
              </div>
            </button>
            <div className="">
              <button className="px-4 py-2 hover:bg-placeholder-color rounded-lg">1 comment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SingleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default SingleBlog;
