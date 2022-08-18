import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ViewDiscussion = ({ data }) => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl w-full py-5">
        <div className="flex justify-between">
          <p className="px-5 text-lg font-semibold align-center">All Discussions</p>
          <div className="flex justify-end px-6">
            <button className="bg-white py-2 px-6 border border-gray-200 rounded-lg hover:bg-primary hover:text-white mr-2">
              Subscribe
            </button>
            <button className="bg-primary text-white py-2 px-6 border border-gray-200 rounded-lg ml-2">New discussion</button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        <div className="">
          {data?.length > 0
            ? data?.map((item) => {
                return (
                  <div key={item?.title} className="hover:shadow-lg">
                    <div className="flex px-6 py-6">
                      <div className="mr-4">
                        <img alt={item?.title} src={item?.profilePicture} className="w-12 h-12 mask mask-squircle" />
                      </div>
                      <div className="">
                        <Link to={`./${item?.id}`} className="font-semibold hover:text-primary">
                          {item?.title}
                        </Link>
                        <p className="pt-2 text-sm text-gray-500">
                          <span className="">{item?.lastReply + " replied " + item?.date}</span>
                          <span className="ml-2">{" " + item?.memberCount + " Members"}</span> ·
                          <span className="">{" " + item?.replyCount + " Replies"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

ViewDiscussion.propTypes = {
  data: PropTypes.array,
};

export default ViewDiscussion;
