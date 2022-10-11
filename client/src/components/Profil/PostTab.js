/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import ProfileFeed from "./ProfileFeed";
import FollowingPreview from "../Newsfeed/FollowingPreview";
import UpdatesComponent from "../Newsfeed/UpdatesComponent";

// import InfoCard from "../../features/user/Profile/component/InfoCard";

const PostTab = ({ user, otherUser, listFollowing, notificationList }) => {
  return (
    <>
      <div className="lg:flex">
        <div className="hidden xl:block basis-[30%] -mt-8 mr-4">
          <div className="">
            <FollowingPreview data={listFollowing} />
          </div>
          <div className="mt-6">
            <UpdatesComponent data={notificationList} />
          </div>
        </div>

        <div className="basis-full xl:basis-[70%]">
          <ProfileFeed user={user} otherUser={otherUser} />
        </div>
      </div>
    </>
  );
};

PostTab.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
  listFollowing: PropTypes.array,
  notificationList: PropTypes.array,
};

export default PostTab;
