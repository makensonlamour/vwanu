import React from "react";
import PropTypes from "prop-types";
import ViewFriend from "../ViewFriend";
import { useGetListFollowing } from "../../../features/follower/followerSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Following = ({ user, fn, isNetwork }) => {
  // const user = useOutletContext();
  const {
    data: listFollowing,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetListFollowing(["user", "following", user?.id], true, user?.id);

  fn(user?.amountOfFollowing || 0);

  return (
    <>
      <ViewFriend
        data={listFollowing}
        isNetwork={isNetwork}
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
  isNetwork: PropTypes.bool,
};

export default Following;
