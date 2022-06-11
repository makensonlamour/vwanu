import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { GoComment } from "react-icons/go";
import { Chip, Stack } from "@mui/material";

const SingleBlogRelated = ({ blog }) => {
  return (
    <>
      <div className="bg-white shadow-sm hover:shadow-xl w-full rounded-xl pb-6 mb-10">
        {blog?.coverPicture !== "undefined" && (
          <div className="">
            <img className="w-full h-64 object-cover rounded-t-xl" src={blog?.coverPicture} alt="blog" />
          </div>
        )}
        {blog?.Interests?.length > 0 && (
          <div className="px-8 mt-5">
            <Stack direction="row" style={{ display: "flex", flexWrap: "wrap" }} spacing={1}>
              {blog?.Interests?.length > 0 &&
                blog?.Interests?.map((interest) => {
                  return <Chip style={{ marginBottom: "1rem" }} key={interest?.id} label={interest?.name} size="small" />;
                })}
            </Stack>
          </div>
        )}
        <div className="px-8 mt-7">
          <Link to={`./${blog?.id}`} className="text-2xl font-semibold hover:text-primary">
            {blog?.blogTitle}
          </Link>
          <p className="mt-7 line-clamp-3">{parse(blog?.blogText)}</p>
          <div className="flex mt-7 mb-4 justify-between items-center">
            <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
              <img className="w-[3rem] h-[3rem] mask mask-squircle" src={blog?.User?.profilePicture} alt={"img_" + blog?.User?.firstName} />
              <div className="ml-4">
                <p className="font-semibold text-left">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                <p className="text-gray-400">{blog?.createdAt}</p>
              </div>
            </Link>
            <div className="">
              <Link to={`./${blog?.id}`} className="px-4 py-2 hover:bg-placeholder-color rounded-lg flex items-center">
                {blog?.Response?.length} <GoComment size={"18px"} className="ml-2" />
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
