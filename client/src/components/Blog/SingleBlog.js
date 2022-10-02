import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";

const SingleBlog = ({ blog }) => {
  return (
    <>
      <div className={` bg-white shadow-sm w-full rounded-xl pb-4 lg:pb-6 mb-8 lg:mb-10 `}>
        {blog?.coverPicture !== "undefined" && (
          <div className="">
            <img className="w-full h-36 lg:h-56 object-cover rounded-t-xl" src={blog?.coverPicture} alt="blog" />
          </div>
        )}
        {blog?.Interests?.length > 0 && (
          <div className={`${blog?.coverPicture === "undefined" ? "" : "pt-3"} px-4 lg:px-8 mt-4 pt-3`}>
            <Stack direction="row" spacing={1}>
              {blog?.Interests?.length > 0 &&
                blog?.Interests?.map((interest) => {
                  return <Chip key={interest?.id} label={interest?.name} size="small" />;
                })}
            </Stack>
          </div>
        )}
        <div className="px-4 lg:px-8 mt-2 lg:mt-4">
          <Link to={`./${blog?.id}`} className="text-md lg:text-2xl font-semibold hover:text-primary line-clamp-2">
            {blog?.blogTitle}
          </Link>
          <p className="text-sm mt-3 lg:mt-4 line-clamp-3">{parse(blog?.blogText)}</p>
          <div className="flex mt-4 lg:mt-4 mb-2 lg:mb-4 justify-between items-center">
            <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
              <img
                className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                src={blog?.User?.profilePicture}
                alt={"img_" + blog?.User?.firstName}
              />
              <div className="ml-4">
                <p className="font-semibold text-left text-md">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                <p className="text-gray-400 text-xs">{blog?.createdAt}</p>
              </div>
            </Link>
            <div className="">
              <Link to={`./${blog?.id}`} className="px-4 py-2 hover:bg-placeholder-color text-md rounded-lg">
                {blog?.Response?.length}{" "}
                {blog?.amountOfComments <= 1 ? blog?.amountOfComments + " Comment" : blog?.amountOfComments + " Comments"}
              </Link>
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
