import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ViewFriend from "../ViewFriend";
import { useGetListFollowers } from "../../../features/follower/followerSlice";

const Followers = ({ fn }) => {
  const { id } = useParams();
  const { data: listFollowers } = useGetListFollowers(["user", "followers"], id === "undefined" ? false : true, id);

  fn(listFollowers?.data?.length);

  return (
    <>
      <ViewFriend data={listFollowers?.data} noDataLabel={"Nobody Follow you"} />
    </>
  );
};

Followers.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Followers;
