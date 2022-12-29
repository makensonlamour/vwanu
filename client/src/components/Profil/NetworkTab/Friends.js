import React from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useGetListFriend } from "../../../features/friend/friendSlice";
import ViewFriend from "../ViewFriend";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Friends = ({ isNetwork }) => {
  const user = useOutletContext();
  const {
    data: listFriend,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetListFriend(["user", "friend", user?.id], true, user?.id);

  return (
    <>
      <ViewFriend
        data={listFriend || []}
        types={"friends"}
        isError={isError}
        isLoading={isLoading}
        arrayQuery={["user", "friend"]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isNetwork={isNetwork}
        noDataLabel={
          <div className="flex justify-center w-full">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, There's no Friend in Vwanu."}
              tips={""}
            />
          </div>
        }
      />
    </>
  );
};

Friends.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
  isNetwork: PropTypes.bool,
};

export default Friends;
