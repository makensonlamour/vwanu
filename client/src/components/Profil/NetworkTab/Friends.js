/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetListFriend } from "../../../features/friend/friendSlice";
import ViewFriend from "../ViewFriend";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Friends = ({ fn }) => {
  const { id } = useParams();
  const { data: listFriend, isError, isLoading, hasNextPage, fetchNextPage } = useGetListFriend(["user", "friend"], true);
  fn(listFriend?.length || 0);

  return (
    <>
      <ViewFriend
        data={listFriend}
        types={"friends"}
        isError={isError}
        isLoading={isLoading}
        arrayQuery={["user", "friend"]}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
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
};

export default Friends;
