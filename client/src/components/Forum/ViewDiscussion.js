import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import InputDiscussion from "../Community/DiscussionTab/InputDiscussion";

const ViewDiscussion = ({ data }) => {
  const id = useParams();
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl w-full py-5">
        <div className="flex justify-between">
          <p className="px-5 text-lg font-semibold align-center">All Discussions</p>
          <div className="flex justify-end px-6">
            <button className="bg-white py-2 px-6 border border-gray-200 rounded-lg hover:bg-primary hover:text-white mr-2">
              Subscribe
            </button>
            <InputDiscussion communityId={id} />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        <div className="">
          {data?.length > 0 ? (
            data?.map((item) => {
              return (
                <div key={item?.title} className="hover:shadow-lg">
                  <div className="flex px-6 py-6">
                    <div className="mr-4">
                      <img alt={item?.title} src={item?.User?.profilePicture} className="w-12 h-12 mask mask-squircle" />
                    </div>
                    <div className="">
                      <Link to={`./${item?.id}`} className="font-semibold hover:text-primary">
                        {item?.title}
                      </Link>
                      <p className="pt-2 text-sm text-gray-500">
                        <span className="">{item?.lastReply + " replied " + item?.createdAt}</span>
                        <span className="ml-2">{" " + item?.memberCount + " Members"}</span> ·
                        <span className="">{" " + item?.replyCount + " Replies"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="py-2">
                <p className="text-center">No discussions</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

ViewDiscussion.propTypes = {
  data: PropTypes.array,
};

export default ViewDiscussion;
