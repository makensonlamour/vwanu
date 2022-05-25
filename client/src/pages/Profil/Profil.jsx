import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import _ from "lodash";

import { useGetOtherProfile } from "../../features/user/userSlice";
import { useGetListFriendRequestSent } from "../../features/friend/friendSlice";

//Core components
// import Loader from "../../components/common/Loader";
import ProfileHeader from "../../components/Profil/ProfileHeader";

const Profil = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = useOutletContext();

  if (_.isEqual(user?.id.toString(), id.toString())) {
    queryClient.removeQueries(["user", "otherUser"]);
  }

  const { data: otherUser } = useGetOtherProfile(["user", "otherUser"], _.isEqual(user?.id.toString(), id.toString()) ? false : true, id);
  const { data: listFriendSent } = useGetListFriendRequestSent(["user", "request"], true);

  return (
    <>
      <div className=" max-w-screen-2xl">
        <div className="lg:mx-1">
          {user?.id === id ? (
            <ProfileHeader user={user} otherUser={null} listFriendRequest={listFriendSent?.data} />
          ) : (
            <ProfileHeader user={user} otherUser={otherUser} listFriendRequest={listFriendSent?.data} />
          )}
        </div>

        {/* <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div> */}
      </div>
    </>
  );
};

export default Profil;
