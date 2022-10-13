/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import ForumReply from "./ForumReply";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useGetListDiscussionReplies, useUpdateDiscussion, useDeleteDiscussion } from "../../features/forum/forumSlice";
import { BiLockOpenAlt, BiLockAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
// import { useQueryClient } from "react-query";
import InputDiscussion from "../Community/DiscussionTab/InputDiscussion";
import { format } from "date-fns";
import Share from "../Share/Share";
// import CustomDropdown from "./../common/CustomDropdown";

const discussionSuccess = (_text) =>
  toast.success("discussion " + _text + " successfully!", {
    position: "top-center",
  });

const discussionError = () =>
  toast.error("Sorry. Error on locking the discussion!", {
    position: "top-center",
  });

const deleteSuccess = () =>
  toast.success("discussion deleted successfully!", {
    position: "top-center",
  });

const deleteError = () =>
  toast.error("Sorry. Error on deleting the discussion!", {
    position: "top-center",
  });

const ViewSingleDiscussion = ({ data, type = "forum", communityData = {} }) => {
  // const queryClient = useQueryClient();
  const user = useOutletContext();
  const [openShare, setOpenShare] = useState(false);
  const navigate = useNavigate();
  const {
    data: listReply,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetListDiscussionReplies(["community", "reply", data?.id], data?.id !== undefined ? true : false, data?.id);
  const updateDiscussion = useUpdateDiscussion(["community", "discussion", data?.id], undefined, undefined);
  const deleteDiscussion = useDeleteDiscussion(["community", "discussion", data?.id], data?.id, undefined, undefined);

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

  const handleDelete = async (_id) => {
    // eslint-disable-next-line no-restricted-globals
    let consent = confirm("Are you sure you want to delete this?");
    if (!consent) return;
    try {
      await deleteDiscussion.mutateAsync({ id: _id });
      // queryClient.invalidateQueries(["community", "discussion", data?.id]);
      deleteSuccess();
      navigate(-1);
    } catch (e) {
      deleteError();
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      {/* Share component */}
      <Share
        post={data}
        label={" Share"}
        link={""}
        type="discussion"
        classNameTrigger="hover:bg-placeholder-color hover:text-black"
        noButton={true}
        customModal={openShare}
        setCustomModal={setOpenShare}
      />
      {/*end of share component */}
      {data !== null || (data !== undefined && Object.keys(data) > 0) ? (
        <div className="bg-white border border-gray-200 rounded-xl w-full">
          <div className={`flex ${type === "forum" ? "justify-between" : "justify-end"} px-6 py-4`}>
            {type === "forum" && (
              <button className="text-sm bg-white px-6 py-2 border border-gray-200 rounded-lg hover:text-white hover:bg-primary">
                {data?.category}
              </button>
            )}
            {(user?.id === data?.User?.id ||
              communityData?.IsMember?.role === "admin" ||
              communityData?.IsMember?.role === "moderator") && (
              <div className="flex justify-end items-center gap-x-1">
                <p className="mr-2 cursor-pointer">
                  {data?.locked ? (
                    <BiLockAlt onClick={() => handleUpdate(false)} size={"24px"} className="inline" />
                  ) : (
                    <BiLockOpenAlt onClick={() => handleUpdate(true)} size={"24px"} className="inline" />
                  )}
                </p>
                {/* <CustomDropdown /> */}
                <div className="dropdown">
                  <label tabIndex={0} className="cursor-pointer">
                    <BsThreeDots size={"24px"} className="inline" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <p onClick={() => setOpenShare(!openShare)} className="hover:bg-placeholder-color hover:text-black">
                        Share
                      </p>
                    </li>
                    <li>
                      <p className="hover:bg-placeholder-color hover:text-black" onClick={() => handleDelete(data?.id)}>
                        Delete
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <p className="px-6 text-lg font-semibold">{data?.title}</p>
          <p className="text-sm text-gray-500 py-1">
            <span className="pl-6">{"Posted by " + data?.User?.firstName + " " + data?.User?.lastName}</span>
            <span className="">
              {" on "}
              {data && format(new Date(data?.createdAt), "MMM dd, yyyy hh:mm aaaa")}
            </span>
          </p>
          <p className="px-6 py-2">{data?.body}</p>
          <p className="pb-4 px-6 text-sm text-gray-500">
            {data?.lastComment !== null && (
              <span className="">
                {data?.lastComment?.commenterFirstName + " " + data?.lastComment?.commenterLastName + " replied on "}
                {data && format(new Date(data?.lastComment?.createdAt), "MMM dd, yyyy hh:mm aaaa")}
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
              communityData={communityData}
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

ViewSingleDiscussion.propTypes = { data: PropTypes.object.isRequired, type: PropTypes.string, communityData: PropTypes.object };

export default ViewSingleDiscussion;
