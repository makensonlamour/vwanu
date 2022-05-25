/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import ProfileFeed from "./ProfileFeed";
import FollowingPreview from "../Newsfeed/FollowingPreview";
import UpdatesComponent from "../Newsfeed/UpdatesComponent";

// import InfoCard from "../../features/user/Profile/component/InfoCard";

const PostTab = ({ user, otherUser, listFollowing }) => {
  const latestUpdates = [
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "10 months ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=3",
      name: "Adele",
      date: "10 months ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "in the group Coffee Addicts",
    },
    {
      avatar: "https://picsum.photos/200/300?image=4",
      name: "John",
      date: "2 years ago",
      where: "",
    },
  ];

  return (
    <>
      <div className="lg:flex">
        <div className="basis-[30%] -mt-8 mr-4">
          <FollowingPreview data={listFollowing} />
          <UpdatesComponent data={latestUpdates} />
        </div>

        <div className="basis-[70%]">
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
};

export default PostTab;
