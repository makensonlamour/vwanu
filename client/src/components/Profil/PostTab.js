import React from "react";
//import PropTypes from "prop-types";
import ProfileFeed from "./ProfileFeed";
import InfoCard from "../../features/user/Profile/component/InfoCard";

const PostTab = () => {
  return (
    <>
      <div className="lg:flex h-52">
        <InfoCard />
        <ProfileFeed />
      </div>
    </>
  );
};

//PostTab.propTypes = {};

export default PostTab;
