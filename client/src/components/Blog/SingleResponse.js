import React from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const SingleResponse = ({ blog }) => {
  return (
    <>
      <div className="w-full" key={blog?.BlogId}>
        <div className="w-full">
          <div className="bg-white border border-gray-300 rounded-xl p-4 mt-4 flex flex-col justify-end">
            <div className="flex justify-between items-center">
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
                <Link to={`#`} className="px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center">
                  <BsThreeDots size={"18px"} className="mr-2" />
                </Link>
              </div>
            </div>
            <p className="py-1 pl-16">{blog?.responseText}</p>
            {/* <div className="py-1"> */}
            {/* <button className="mr-2 pl-16 text-sm hover:text-primary font-semibold">Reply</button> */}
            {/* <button className="ml-2">Edit</button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

SingleResponse.propTypes = {
  blog: PropTypes.object,
};

export default SingleResponse;
