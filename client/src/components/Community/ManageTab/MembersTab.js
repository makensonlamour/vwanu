import React from "react";
import MemberDescription from "../MemberTab/MemberDescription";
import { useParams } from "react-router-dom";
import { assignCommunityMember } from "../../../helpers/index";
import { useGetAllMembersCommunity } from "../../../features/community/communitySlice";
import MemberSettings from "../MemberTab/MemberSettings";

const MembersTab = () => {
  const { id } = useParams();
  const { data: listMembers } = useGetAllMembersCommunity(["community", "members", id], id !== "undefined" ? true : false, id);

  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-4 text-lg font-semibold">{`Members`}</h4>
        <p className="mb-6 ">Manage group members; promote to moderators, co-organizers, or demote or ban.</p>
        <MemberDescription
          title={"Administrators"}
          description={
            "Administrators have total control over the contents and settings of a group. That includes all the abilities of moderators, as well as the ability to turn group forums on or off, change group status from public to private, change the group photo, manage group members, and delete the group."
          }
        />
        {assignCommunityMember(listMembers?.data, "admin")?.length > 0 && (
          <>
            <MemberSettings data={assignCommunityMember(listMembers?.data, "admin")} />
          </>
        )}

        <div className="my-4">
          {assignCommunityMember(listMembers?.data, "moderator")?.length > 0 && (
            <>
              {" "}
              <MemberDescription
                title={"Moderators"}
                description={
                  "When a group member is promoted to be a moderator of the group, the member gains the ability to edit and delete any forum discussion within the group and delete any activity feed items, excluding those posted by administrators."
                }
              />
              <MemberSettings data={assignCommunityMember(listMembers?.data, "moderator")} />
            </>
          )}
        </div>

        <div className="mb-4">
          {assignCommunityMember(listMembers?.data, "member")?.length > 0 && (
            <>
              {" "}
              <MemberDescription
                title={"Members"}
                description={
                  "When a member joins a group, he or she is assigned the member role by default. Members are able to contribute to the group’s discussions, activity feeds, and view other group members."
                }
              />
              <MemberSettings data={assignCommunityMember(listMembers?.data, "member")} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MembersTab;
