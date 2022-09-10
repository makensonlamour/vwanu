import React from "react";
import { useGetMyCommunityInvitation } from "../../../features/community/communitySlice";
import { useOutletContext } from "react-router-dom";
import ViewInvitation from "./ViewInvitation";

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
              <p className="text-center text-lg font-semibold">No Invitations found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvitationTabs;
