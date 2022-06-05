import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ViewFriend from "../ViewFriend";
import { useGetListFollowing } from "../../../features/follower/followerSlice";

const Following = ({ fn }) => {
  const { id } = useParams();
  const { data: listFollowing } = useGetListFollowing(["user", "following"], id === "undefined" ? false : true, id);

  fn(listFollowing?.data?.length);

  return (
    <>
      <ViewFriend data={listFollowing?.data} noDataLabel={"You follow nobody"} />
    </>
  );
};

Following.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Following;
