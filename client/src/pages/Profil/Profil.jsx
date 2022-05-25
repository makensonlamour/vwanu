import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import _ from "lodash";

import { useGetOtherProfile } from "../../features/user/userSlice";
import { useGetListFriendRequestSent, useGetListFriend } from "../../features/friend/friendSlice";
import { useGetListFollowing, useGetListFollowers } from "../../features/follower/followerSlice";

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
  const { data: listFriendSent } = useGetListFriendRequestSent(["user", "sent"], true);
  const { data: listFriend } = useGetListFriend(["user", "friend"], true);
  const { data: listFollowers } = useGetListFollowers(["user", "followers"], true);
  const { data: listFollowing } = useGetListFollowing(["user", "following"], true);

  return (
    <>
      <div className=" max-w-screen-2xl">
        <div className="lg:mx-1">
          {user?.id === id ? (
            <ProfileHeader
              user={user}
              otherUser={null}
              listFriendSent={listFriendSent?.data}
              listFriend={listFriend?.data}
              listFollowers={listFollowers?.data}
              listFollowing={listFollowing?.data}
            />
          ) : (
            <ProfileHeader
              user={user}
              otherUser={otherUser}
              listFriendRequest={listFriendSent?.data}
              listFriend={listFriend?.data}
              listFollowers={listFollowers?.data}
              listFollowing={listFollowing?.data}
            />
          )}
        </div>

        {/* <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div> */}
      </div>
    </>
  );
};

export default Profil;
