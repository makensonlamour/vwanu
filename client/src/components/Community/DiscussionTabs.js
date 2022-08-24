import React from "react";
import { useParams } from "react-router-dom";
import ViewDiscussion from "./../../components/Forum/ViewDiscussion";
import { useGetListDiscussionCommunity } from "../../features/forum/forumSlice";

const DiscussionTabs = () => {
  const { id } = useParams();
  const { data: listDiscussion } = useGetListDiscussionCommunity(["community", "discussion", "all"], id !== "undefined" ? true : false, id);
  return (
    <>
      <div className="w-full">
        <div className="my-5">
          <ViewDiscussion data={listDiscussion?.data} />
        </div>
      </div>
    </>
  );
};

export default DiscussionTabs;
