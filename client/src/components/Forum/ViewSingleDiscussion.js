import React from "react";
import PropTypes from "prop-types";
import ForumReply from "./ForumReply";
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
  const {
    data: listReply,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetListDiscussionReplies(["community", "reply", data?.id], data?.id !== undefined ? true : false, data?.id);
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
        <div className="bg-white border border-gray-200 rounded-xl w-full">
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
            {data?.lastComment !== null && (
              <span className="">
                {data?.lastComment?.commenterFirstName +
                  " " +
                  data?.lastComment?.commenterLastName +
                  " replied on " +
                  data?.lastComment?.createdAt}
              </span>
            )}
            {data?.lastComment === null && (
              <span className="">{data?.User?.firstName + " " + data?.User?.lastName + " created on " + data?.createdAt}</span>
            )}
            <span className="mx-2">
              {data?.activeParticipants === 0
                ? "0 Member"
                : data?.activeParticipants > 1
                ? data?.activeParticipants + " Members"
                : data?.activeParticipants + " Member"}
            </span>{" "}
            •
            <span className="mx-2">
              {data?.amountOfComments === 0
                ? "0 Reply"
                : data?.amountOfComments > 1
                ? data?.amountOfComments + " Replies"
                : data?.amountOfComments + " Reply"}
            </span>
          </p>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-between w-full items-center">
            <p className="font-semibold py-6 px-4">
              {data?.amountOfComments === 0
                ? "0 Reply"
                : data?.amountOfComments > 1
                ? data?.amountOfComments + " Replies"
                : data?.amountOfComments + " Reply"}
            </p>
            {!data?.locked && (
              <div className="">
                {/* <button className="text-white bg-primary px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48"> */}
                <InputDiscussion labelBtn={"Reply"} communityId={""} data={data} type="reply" />
                {/* </button> */}
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-gray-200"></div>

          <div key={"1"} className="">
            <ForumReply
              data={listReply}
              isLoading={isLoading}
              isError={isError}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              id={data?.id}
            />
          </div>
        </div>
      ) : (
        <p>Error, please reload the page</p>
      )}
    </>
  );
};

ViewSingleDiscussion.propTypes = { data: PropTypes.object.isRequired, type: PropTypes.string };

export default ViewSingleDiscussion;
