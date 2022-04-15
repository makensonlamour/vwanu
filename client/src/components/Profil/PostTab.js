import React from "react";
import PropTypes from "prop-types";
import ProfileFeed from "./ProfileFeed";
import InfoCard from "../../features/user/Profile/component/InfoCard";

const PostTab = ({ user, otherUser }) => {
  return (
    <>
      <div className="lg:flex h-52">
        <InfoCard user={user} otherUser={otherUser} />
        <ProfileFeed user={user} otherUser={otherUser} />
      </div>
    </>
  );
};

PostTab.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default PostTab;
