import React from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const SingleResponse = ({ blogs }) => {
  return (
    <>
      {blogs?.length > 0 ? (
        blogs?.map((blog) => {
          return (
            <div key={blog?.BlogId}>
              <div className="">
                <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6 flex flex-col justify-end">
                  <div className="flex justify-between items-center">
                    <Link to={"../../profile/" + blog?.User?.id} className="flex items-center hover:text-primary">
                      <img
                        className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                        src={blog?.User?.profilePicture}
                        alt={"img_" + blog?.User?.firstName}
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-left text-md">{blog?.User?.firstName + " " + blog?.User?.lastName}</p>
                        <p className="text-gray-400 text-sm">{blog?.createdAt}</p>
                      </div>
                    </Link>
                    <div className="">
                      <Link to={`#`} className="px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center">
                        <BsThreeDots size={"18px"} className="mr-2" />
                      </Link>
                    </div>
                  </div>
                  <p className="py-3">{blog?.responseText}</p>
                  <div className="py-3">
                    <button className="mr-2">Reply</button>
                    <button className="ml-2">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="bg-white border border-gray-300 rounded-xl p-4 mt-6 flex flex-col justify-end">
          {`This blog don't have any response yet.`}
        </div>
      )}
    </>
  );
};

SingleResponse.propTypes = {
  blogs: PropTypes.object,
};

export default SingleResponse;
