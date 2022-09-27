import React from "react";
import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
import { useGetAllMembers } from "../../features/user/userSlice";
import ViewFriend from "../Profil/ViewFriend";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";

const MemberList = ({ fn }) => {
  // const { id } = useParams();
  const { data: listMember, isError, hasNextPage, fetchNextPage, isLoading } = useGetAllMembers(["user", "members"], true);
  fn(listMember?.data?.length);

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
