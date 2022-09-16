import React from "react";
import { useGetMyCommunityInvitation } from "../../../features/community/communitySlice";
import { useOutletContext } from "react-router-dom";
import ViewInvitation from "./ViewInvitation";
import EmptyComponent from "../../common/EmptyComponent";
import { FaUsersSlash } from "react-icons/fa";

const InvitationTabs = () => {
  const user = useOutletContext();
  const { data: listInvitation } = useGetMyCommunityInvitation(
    ["community", "invitation", "all"],
    user?.id !== undefined ? true : false,
    user?.id
  );

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          {listInvitation?.data?.length > 0 ? (
            listInvitation?.data?.map((member) => {
              return <ViewInvitation key={member?.id} member={member} />;
            })
          ) : (
            <div className="flex justify-center">
              <EmptyComponent
                icon={<FaUsersSlash size={"32px"} className="" />}
                placeholder={"You don't have any community invitations yet."}
                tips={"Here, you can see all the invitations that someone sent you to join a community!"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvitationTabs;
