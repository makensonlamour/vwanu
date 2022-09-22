import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import InputDiscussion from "../Community/DiscussionTab/InputDiscussion";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";

const ViewDiscussion = ({ data, type = "forum" }) => {
  const id = useParams();
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl w-full py-5">
        <div className="flex justify-between items-center">
          <p className="px-5 text-sm lg:text-lg font-semibold align-center">All Discussions</p>
          <div className="flex justify-end px-4 items-center lg:px-6">
            {/* <button className="w-fit bg-white py-1 lg:py-2 px-2 lg:px-6 border border-gray-200 rounded-lg hover:bg-primary hover:text-white mr-2">
              Subscribe
            </button> */}
            <InputDiscussion labelBtn={"New Discussion"} communityId={id} data={{}} type="new" />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        <div className="">
          {data?.length > 0 ? (
            data?.map((item) => {
              return (
                <div key={item?.title} className="hover:shadow-lg">
                  <div className="flex lg:px-6 px-4 lg:py-6 py-4">
                    <div className="mr-4">
                      <img alt={item?.title} src={item?.User?.profilePicture} className="w-12 h-12 mask mask-squircle" />
                    </div>
                    <div className="">
                      <Link to={type === "forum" ? `./${item?.id}` : `.?idD=${item?.id}`} className="font-semibold hover:text-primary">
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
              <div className="flex justify-center">
                <EmptyComponent
                  border={false}
                  icon={<ImSad size={"32px"} className="" />}
                  placeholder={"Sorry, There were no discussions found."}
                  tips={"You can be the first to ccreate a discussion in this forum by clicking on the new discussion button."}
                />
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
  type: PropTypes.string,
};

export default ViewDiscussion;
