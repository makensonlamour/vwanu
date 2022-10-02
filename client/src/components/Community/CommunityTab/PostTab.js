import React from "react";
import { useOutletContext } from "react-router-dom";
import CommunityFeed from "./CommunityFeed";
import PropTypes from "prop-types";
import FollowingPreview from "../../Newsfeed/FollowingPreview";
import UpdatesComponent from "../../Newsfeed/UpdatesComponent";

const PostTab = ({ listFollowing, notificationList }) => {
  const { user } = useOutletContext();
  return (
    <>
      <div className="lg:flex">
        <div className="hidden xl:block basis-[30%] -mt-8 mr-4">
          <div className="">
            <FollowingPreview data={listFollowing} />
          </div>
          <div className="">
            <UpdatesComponent data={notificationList} />
          </div>
        </div>
        <div className="basis-full xl:basis-[70%]">
          <CommunityFeed user={user} />
        </div>
      </div>
    </>
  );
};

PostTab.propTypes = {
  listFollowing: PropTypes.array,
  notificationList: PropTypes.array,
};

export default PostTab;
