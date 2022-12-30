import React from "react";
import PropTypes from "prop-types";
import { useGetAllMembers } from "../../features/user/userSlice";
import ViewFriend from "../Profil/ViewFriend";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";

const MemberList = () => {
  const { data: listMember, isError, hasNextPage, fetchNextPage, isLoading } = useGetAllMembers(["user", "members"], true);

  return (
    <>
      <ViewFriend
        data={listMember}
        isError={isError}
        isLoading={isLoading}
        arrayQuery={["user", "members"]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        noDataLabel={
          <div className="flex justify-center w-full">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, There's no member in Vwanu."}
              tips={""}
            />
          </div>
        }
      />
    </>
  );
};

MemberList.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default MemberList;
