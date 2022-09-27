/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ViewFriend from "../ViewFriend";
import { useGetListFollowers } from "../../../features/follower/followerSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../common/EmptyComponent";

const Followers = ({ fn }) => {
  const { id } = useParams();
  const { data: listFollowers, isLoading, isError } = useGetListFollowers(["user", "followers"], true);

  fn(listFollowers?.length || 0);

  return (
    <>
      <ViewFriend
        data={listFollowers}
        isError={isError}
        isLoading={isLoading}
        arrayQuery={["user", "followers"]}
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

Followers.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Followers;
