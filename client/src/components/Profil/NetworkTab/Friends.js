/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetListFriend } from "../../../features/friend/friendSlice";
import ViewFriend from "../ViewFriend";

const Friends = ({ fn }) => {
  const { id } = useParams();
  const { data: listFriend } = useGetListFriend(["user", "friend"], true);
  fn(listFriend?.data?.length);

  return (
    <>
      <ViewFriend data={listFriend?.data} types={"followings"} noDataLabel={"No Friends"} />
    </>
  );
};

Friends.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Friends;
