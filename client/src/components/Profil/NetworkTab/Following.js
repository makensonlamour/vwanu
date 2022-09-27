import React from "react";
import PropTypes from "prop-types";
import ViewFriend from "../ViewFriend";
import { useGetListFollowing } from "../../../features/follower/followerSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Following = ({ fn }) => {
  const { data: listFollowing, isError, isLoading, hasNextPage, fetchNextPage } = useGetListFollowing(["user", "following"], true);

  fn(listFollowing?.length || 0);

  return (
    <>
      <ViewFriend
        data={listFollowing}
        types={"followings"}
        isError={isError}
        isLoading={isLoading}
        arrayQuery={["user", "following"]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        noDataLabel={
          <div className="flex justify-center w-full">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, you follow nobody."}
              tips={""}
            />
          </div>
        }
      />
    </>
  );
};

Following.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Following;
