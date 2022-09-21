import React from "react";
import PropTypes from "prop-types";
import ForumReply from "./ForumReply";
import EmptyComponent from "../common/EmptyComponent";
import { ImSad } from "react-icons/im";
import { useGetListDiscussionReplies, useUpdateDiscussion } from "../../features/forum/forumSlice";
import { BiLockOpenAlt, BiLockAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
// import { useQueryClient } from "react-query";
import InputDiscussion from "../Community/DiscussionTab/InputDiscussion";

const discussionSuccess = (_text) =>
  toast.success("discussion " + _text + " successfully!", {
    position: "top-center",
  });

const discussionError = () =>
  toast.error("Sorry. Error on locking the discussion!", {
    position: "top-center",
  });

const ViewSingleDiscussion = ({ data, type = "forum" }) => {
  // const queryClient = useQueryClient();
  const { data: listReply } = useGetListDiscussionReplies(
    ["community", "reply", data?.id],
    data?.id !== undefined ? true : false,
    data?.id
  );
  const updateDiscussion = useUpdateDiscussion(["community", "discussion", data?.id], undefined, undefined);

  const handleUpdate = async (locked) => {
    try {
      const dataObj = {
        id: data?.id,
        locked,
      };
      await updateDiscussion.mutateAsync(dataObj);
      // queryClient.invalidateQueries(["community", "discussion", data?.id]);
      if (locked) {
        discussionSuccess("locked");
      } else {
        discussionSuccess("unlocked");
      }
      window.location.reload();
    } catch (e) {
      discussionError();
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      {data !== null || (data !== undefined && Object.keys(data) > 0) ? (
        <div className="bg-white border border-gray-200 rounded-xl w-full mr-10">
          <div className={`flex ${type === "forum" ? "justify-between" : "justify-end"} px-6 py-4`}>
            {type === "forum" && (
              <button className="text-sm bg-white px-6 py-2 border border-gray-200 rounded-lg hover:text-white hover:bg-primary">
                {data?.category}
              </button>
            )}
            <div className="flex justify-end items-center">
              <p className="mr-2">
                {data?.locked ? (
                  <BiLockAlt onClick={() => handleUpdate(false)} size={"24px"} className="inline" />
                ) : (
                  <BiLockOpenAlt onClick={() => handleUpdate(true)} size={"24px"} className="inline" />
                )}
              </p>
              <p className="">
                <BsThreeDots size={"24px"} className="inline" />
              </p>
            </div>
          </div>
          <p className="px-6 text-lg font-semibold">{data?.title}</p>
          <p className="text-sm text-gray-500 py-1">
            <span className="px-6">{"Posted by " + data?.User?.firstName + " " + data?.User?.lastName}</span>
            <span className="">{"on " + data?.createdAt}</span>
          </p>
          <p className="px-6 py-2">{data?.body}</p>
          <p className="pb-4 px-6 text-sm text-gray-500">
            <span className="">{data?.lastReply + " replied " + data?.createdAt}</span>
            <span className="ml-2">{" " + data?.memberCount + " Members"}</span> ·
            <span className="">{" " + data?.replyCount + " Replies"}</span>
          </p>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between w-full items-center">
            <p className="font-semibold py-6 px-4">{data?.replyCount + " Replies"}</p>
            {!data?.locked && (
              <div className="">
                {/* <button className="text-white bg-primary px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48"> */}
                <InputDiscussion labelBtn={"Reply"} communityId={""} data={data} type="reply" />
                {/* </button> */}
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-gray-200"></div>
          {listReply?.data?.length > 0 ? (
            listReply?.data?.map((reply) => {
              return (
                <div key={"1"} className="">
                  <ForumReply data={reply} />
                </div>
              );
            })
          ) : (
            <div className="flex justify-center">
              <EmptyComponent
                border={false}
                icon={<ImSad size={"32px"} className="" />}
                placeholder={"Sorry, There were no replies found."}
                tips={"You can be the first to reply to this discussion by clicking on the reply button."}
              />
            </div>
          )}
        </div>
      ) : (
        <p>Error, please reload the page</p>
      )}
    </>
  );
};

ViewSingleDiscussion.propTypes = { data: PropTypes.object.isRequired, type: PropTypes.string };

export default ViewSingleDiscussion;
