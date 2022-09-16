import React from "react";
import { useGetCommunityInvitation } from "../../../features/community/communitySlice";
import { useParams } from "react-router-dom";
import ViewInvitation from "../Invitation//ViewInvitation";

const PendingInvites = () => {
  //   const user = useOutletContext();
  const { id } = useParams();
  const { data: listInvitation } = useGetCommunityInvitation(["community", "invitation", "all"], id !== "undefined" ? true : false, id);

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

export default PendingInvites;
