import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetListFriend } from "../../../features/friend/friendSlice";
import ViewFriend from "../../Profil/ViewFriend";

const Member = () => {
  const { id } = useParams();
  const { data: listFriend } = useGetListFriend(["user", "friend"], id === "undefined" ? false : true, id);
  //   fn(listFriend?.data?.length);

  console.log(listFriend?.data);

  return (
    <>
      <ViewFriend data={listFriend?.data} noDataLabel={"No Member"} />
    </>
  );
};

Member.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Member;
