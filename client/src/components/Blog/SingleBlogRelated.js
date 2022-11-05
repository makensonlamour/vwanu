import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { GoComment } from "react-icons/go";
import { Chip, Stack } from "@mui/material";
import placeholderBlog from "../../assets/images/placeholderBlog.png";
import { format } from "date-fns";

const SingleBlogRelated = ({ blog }) => {
  return (
    <>
      <div className="bg-white shadow-sm w-full rounded-xl pb-1 mb-4 lg:pb-4 lg:mb-8">
        {blog?.coverPicture !== null ? (
          <div className="">
            <img className="w-full h-32 lg:h-48 object-cover rounded-t-xl" src={blog?.coverPicture} alt="blog" />
          </div>
        ) : (
          <div className="">
            <img className="w-full h-32 lg:h-48 object-cover rounded-t-xl" src={placeholderBlog} alt="blog" />
          </div>
        )}
        {blog?.Interests?.length > 0 && (
          <div className="px-2 lg:px-2 mt-4">
            <Stack className="flex justify-start w-full flex-wrap gap-2" direction="row" spacing={1}>
              {blog?.Interests?.length > 0 &&
                blog?.Interests?.map((interest) => {
                  return <Chip key={interest?.id} label={interest?.name} size="small" />;
                })}
            </Stack>
          </div>
        )}
        <div className="px-3 lg:px-6 mt-2 lg:mt-3">
          <Link to={`../../blogs/${blog?.id}`} className="text-md lg:text-xl font-semibold hover:text-primary line-clamp-2">
            {blog?.blogTitle}
          </Link>
          <p className="text-sm mt-2 lg:mt-3 line-clamp-3">{parse(blog?.blogText)}</p>
          <div className="flex mt-2 lg:mt-4 mb-2 lg:mb-4 justify-between items-center">
            <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
              <img
                className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                src={blog?.User?.profilePicture}
                alt={"img_" + blog?.User?.firstName}
              />
              <div className="ml-4">
                <p className="font-semibold text-left text-sm md:text-md">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                <p className="text-gray-400 text-xs">{blog && format(new Date(blog?.createdAt), "MMM dd, yyyy hh:mm aaaa")}</p>
              </div>
            </Link>
            <div className="">
              <Link to={`../../blogs/${blog?.id}`} className="px-2 md:px-4 py-2 hover:bg-placeholder-color text-sm md:text-md rounded-lg">
                {blog?.Response?.length} <GoComment size={"18px"} className="ml-2 mr-1 inline" /> {blog?.amountOfComments}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SingleBlogRelated.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default SingleBlogRelated;
