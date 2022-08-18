import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetAllMembers } from "../../features/user/userSlice";
import ViewFriend from "../Profil/ViewFriend";

const MemberList = ({ fn }) => {
  const { id } = useParams();
  const { data: listMember } = useGetAllMembers(["user", "friend"], id === "undefined" ? false : true, id);
  fn(listMember?.data?.data?.length);

  return (
    <>
      <ViewFriend data={listMember?.data?.data} noDataLabel={"No Members"} />
    </>
  );
};

MemberList.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default MemberList;
