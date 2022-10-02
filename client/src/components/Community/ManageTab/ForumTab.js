/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetCommunity, useUpdateCommunity } from "./../../../features/community/communitySlice";
import toast, { Toaster } from "react-hot-toast";

const updateSuccess = () =>
  toast.success("community updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating community!", {
    position: "top-center",
  });

const ForumTab = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { data: communityData } = useGetCommunity(["community", id], id !== undefined ? true : false, id);
  const updateCommunity = useUpdateCommunity(["community", id], id, undefined, undefined);
  const [forum, setForum] = useState(false);
  const testRef = useRef(null);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const dataObj = { haveDiscussionForum: forum };
      await updateCommunity.mutateAsync(dataObj);
      updateSuccess();
      window.location.reload();
    } catch (e) {
      updateError();
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForum(communityData?.haveDiscussionForum || false);
  }, [communityData]);

  return (
    <>
      <Toaster />
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-4a text-lg font-semibold">{`Forum`}</h4>
        <div className="">
          <p className="text-sm">
            {
              "Connect a discussion forum to allow members of this group to communicate in a structured, bulletin-board style fashion. Unchecking this option will not delete existing forum content."
            }
          </p>
          <div className="flex mt-6">
            <label className="flex items-center">
              <input
                checked={forum}
                defaultChecked={forum}
                onChange={() => setForum(!forum)}
                value={forum}
                type="checkbox"
                className="checked:bg-secondary cursor-pointer w-6 h-6 border-1 border-secondary rounded-md"
              />
              <span className="ml-2">Discussion Forum</span>
            </label>
          </div>
          <div className="justify-end flex mt-3">
            <button onClick={() => handleSubmit()} className="hover:bg-secondary px-6 bg-primary py-1 text-white rounded-lg ">
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumTab;
