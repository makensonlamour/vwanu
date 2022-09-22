import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";

const ForumReply = ({ data }) => {
  const [over, setOver] = useState(false);
  return (
    <>
      <div
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        className="hover:bg-gray-100 px-4 py-4 border-t border-gray-200"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="">
              <img src={data?.User?.profilePicture} alt="_profile_picture" className="w-12 h-12 border mask mask-squircle" />
            </div>
            <div className="ml-2">
              <p className="font-[400] align-middle text-lg">{data?.User?.firstName + " " + data?.User?.lastName}</p>
              <p className="">{data?.createdAt}</p>
            </div>
          </div>
          {over && (
            <div className="">
              <button className="mr-2">
                <IoMdShareAlt size={"24px"} className="inline" />
              </button>
              <button className="">
                <BsThreeDots size={"24px"} className="inline" />
              </button>
            </div>
          )}
        </div>
        <div className="py-2">
          <p className="">{data?.body}</p>
        </div>
      </div>
    </>
  );
};

ForumReply.propTypes = { data: PropTypes.object.isRequired };

export default ForumReply;
