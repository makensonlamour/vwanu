import React from "react";
import { useOutletContext } from "react-router-dom";
import CommunityFeed from "./CommunityFeed";

const PostTab = () => {
  const { user } = useOutletContext();
  return (
    <>
      <div>
        <div className="basis-full xl:basis-[70%]">
          <CommunityFeed user={user} />
        </div>
      </div>
    </>
  );
};

export default PostTab;
