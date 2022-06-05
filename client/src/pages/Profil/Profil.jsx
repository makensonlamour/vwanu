import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import _ from "lodash";

import client from "../../features/feathers";
import { useGetOtherProfile } from "../../features/user/userSlice";
import { useGetListFriendRequestSent } from "../../features/friend/friendSlice";
import { useGetListFollowing, useGetListFollowers } from "../../features/follower/followerSlice";

//Core components
// import Loader from "../../components/common/Loader";
import ProfileHeader from "../../components/Profil/ProfileHeader";

const Profil = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = useOutletContext();
  const [notificationList, setNotificationList] = useState([]);

  if (_.isEqual(user?.id.toString(), id.toString())) {
    queryClient.removeQueries(["user", "otherUser"]);
  }

  const { data: otherUser } = useGetOtherProfile(["user", "otherUser"], _.isEqual(user?.id.toString(), id.toString()) ? false : true, id);
  const { data: listFriendSent } = useGetListFriendRequestSent(["user", "sent"], true);
  const { data: listFollowers } = useGetListFollowers(["user", "followers"], true);
  const { data: listFollowing } = useGetListFollowing(["user", "following"], true);
  // const listFollowersOther = [];
  // const listFollowingOther = [];
  // const listFriendSent = [];
  // const listFriendOther = [];

  const onCreatedListener = (notification) => {
    if (notification.to.toString() === user.id.toString() && notification?.UserId?.toString() !== user.id.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    const notifications = await notificationService.find({ query: { to: user?.id } });
    notifications.forEach(onCreatedListener);

    return () => {
      notificationService.removeListener("created", onCreatedListener);
    };
  };

  useEffect(() => {
    nots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl">
        <div className="lg:mx-1">
          {user?.id === id ? (
            <ProfileHeader
              user={user}
              otherUser={null}
              listFriendSent={listFriendSent?.data}
              listFollowers={listFollowers?.data}
              listFollowing={listFollowing?.data}
              notificationList={notificationList}
            />
          ) : (
            <ProfileHeader
              user={user}
              otherUser={otherUser}
              listFriendRequest={listFriendSent?.data}
              listFollowers={listFollowers?.data}
              listFollowing={listFollowing?.data}
              notificationList={notificationList}
            />
          )}
        </div>

        {/* <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div> */}
      </div>
    </>
  );
};

export default Profil;
