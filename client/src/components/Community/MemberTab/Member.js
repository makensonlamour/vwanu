import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetAllMembersCommunity } from "../../../features/community/communitySlice";
import ViewFriend from "../../Profil/ViewFriend";
import { assignCommunityMember } from "../../../helpers/index";

const Member = () => {
  const { id } = useParams();
  const { data: listFriend } = useGetAllMembersCommunity(["user", "friend"], id === "undefined" ? false : true, id);
  //   fn(listFriend?.length);

  return (
    <>
      {assignCommunityMember(listFriend, "admin")?.length > 0 && (
        <>
          <p className="text-xl">Administrators</p>
          <ViewFriend data={assignCommunityMember(listFriend, "admin")} noDataLabel={"No Member"} />
        </>
      )}

      {assignCommunityMember(listFriend, "moderator")?.length > 0 && (
        <>
          <p className="text-xl">Moderators</p>
          <ViewFriend data={assignCommunityMember(listFriend, "moderator")} noDataLabel={"No Member"} />
        </>
      )}

      {assignCommunityMember(listFriend, "member")?.length > 0 && (
        <>
          <p className="text-xl">Members</p>
          <ViewFriend data={assignCommunityMember(listFriend, "member")} noDataLabel={"No Member"} />
        </>
      )}
    </>
  );
};

Member.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Member;
