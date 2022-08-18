import React from "react";
import PropTypes from "prop-types";
import ViewFriend from "../ViewFriend";
import { useGetListFollowing } from "../../../features/follower/followerSlice";

const Following = ({ fn }) => {
  const { data: listFollowing } = useGetListFollowing(["user", "following"], true);

  fn(listFollowing?.data?.length);

  return (
    <>
      <ViewFriend data={listFollowing?.data} types={"friends"} noDataLabel={"You follow nobody"} />
    </>
  );
};

Following.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Following;
