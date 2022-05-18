import React from "react";
import PropTypes from "prop-types";
import ProfileFeed from "./ProfileFeed";
import FollowingPreview from "../Newsfeed/FollowingPreview";

// import InfoCard from "../../features/user/Profile/component/InfoCard";

const PostTab = ({ user, otherUser }) => {
  const followings = [
    { image: "https://picsum.photos/200/300?image=0" },
    { image: "https://picsum.photos/200/300?image=1" },
    { image: "https://picsum.photos/200/300?image=2" },
    { image: "https://picsum.photos/200/300?image=3" },
    { image: "https://picsum.photos/200/300?image=4" },
    { image: "https://picsum.photos/200/300?image=5" },
    { image: "https://picsum.photos/200/300?image=6" },
    { image: "https://picsum.photos/200/300?image=7" },
    { image: "https://picsum.photos/200/300?image=8" },
    { image: "https://picsum.photos/200/300?image=9" },
    { image: "https://picsum.photos/200/300?image=10" },
    { image: "https://picsum.photos/200/300?image=11" },
    { image: "https://picsum.photos/200/300?image=12" },
  ];
  return (
    <>
      <div className="lg:flex">
        <div className="basis-[50%] -mt-8 mr-4">
          <FollowingPreview data={followings} />
        </div>

        <div className="">
          <ProfileFeed user={user} otherUser={otherUser} />
        </div>
      </div>
    </>
  );
};

PostTab.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default PostTab;
