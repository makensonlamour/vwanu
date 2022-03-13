import React from "react";
import { Link } from "react-router-dom";
//core components

//data

const ProfileHeader = () => {
  return (
    <>
      <div className="h-screen fixed overflow-scroll -mt-2">
        <div className="tabs">
          <Link to="/#" className="tab tab-bordered">
            Post
          </Link>
          <Link to="/#1" className="tab tab-bordered tab-active">
            About
          </Link>
          <Link to="/#2" className="tab tab-bordered">
            Friends
          </Link>
          <Link to="/#2" className="tab tab-bordered">
            Photos
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
