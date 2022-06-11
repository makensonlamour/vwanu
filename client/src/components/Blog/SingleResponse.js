import React from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const SingleResponse = ({ blog }) => {
  const blogResponse = {
    id: 1,
    firstName: "Test",
    lastName: "Test",
    createdAt: "June 09, 2022",
    responseText: "Hope this article is helpful for my Europe trip….TIA",
  };
  return (
    <>
      <div>
        <div className="">
          <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6 flex flex-col justify-end">
            <div className="flex justify-between items-center">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[3rem] h-[3rem] mask mask-squircle"
                  src={blog?.data?.User?.profilePicture}
                  alt={"img_" + blog?.data?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left">{blogResponse?.firstName + " " + blogResponse?.lastName}</p>
                  <p className="text-gray-400">{blog?.data?.createdAt}</p>
                </div>
              </Link>
              <div className="">
                <Link to={`#`} className="px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center">
                  <BsThreeDots size={"18px"} className="mr-2" />
                </Link>
              </div>
            </div>
            <p className="py-3">{blogResponse?.responseText}</p>
            <div className="py-3">
              <button className="mr-2">Reply</button>
              <button className="ml-2">Edit</button>
            </div>
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
