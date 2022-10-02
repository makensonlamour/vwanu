import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetAllMembersCommunity } from "../../../features/community/communitySlice";
import ViewMember from "./ViewMember";
import { assignCommunityMember } from "../../../helpers/index";

const Member = () => {
  const { id } = useParams();
  const { data: listFriend } = useGetAllMembersCommunity(["user", "friend"], id === "undefined" ? false : true, id);
  //   fn(listFriend?.length);

  return (
    <>
      <div className="bg-white p-2 md:p-8 border border-gray-200 rounded-lg mb-4">
        {assignCommunityMember(listFriend, "admin")?.length > 0 && (
          <>
            <p className="text-xl">Administrators</p>
            <ViewMember data={assignCommunityMember(listFriend, "admin")} noDataLabel={"No Member"} />
          </>
        )}

        {assignCommunityMember(listFriend, "moderator")?.length > 0 && (
          <>
            <p className="text-xl">Moderators</p>
            <ViewMember data={assignCommunityMember(listFriend, "moderator")} noDataLabel={"No Member"} />
          </>
        )}

        {assignCommunityMember(listFriend, "member")?.length > 0 && (
          <>
            <p className="text-xl">Members</p>
            <ViewMember data={assignCommunityMember(listFriend, "member")} noDataLabel={"No Member"} />
          </>
        )}
      </div>
    </>
  );
};

Member.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Member;
