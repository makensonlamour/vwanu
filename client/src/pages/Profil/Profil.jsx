import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import _ from "lodash";
import client from "../../features/feathers";
import { useGetOtherProfile } from "../../features/user/userSlice";
import { useGetListFriendRequestSent } from "../../features/friend/friendSlice";
import { useGetListFollowing, useGetListFollowers } from "../../features/follower/followerSlice";
//Core components
import ProfileHeader from "../../components/Profil/ProfileHeader";
import Loader from "./../../components/common/Loader";

const Profil = () => {
  let run = false;
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = useOutletContext();
  const [notificationList, setNotificationList] = useState([]);

  if (_.isEqual(user?.id?.toString(), id?.toString())) {
    queryClient.removeQueries(["user", "otherUser"]);
  }

  const {
    data: otherUser,
    isLoading,
    isError,
  } = useGetOtherProfile(["user", "otherUser"], _.isEqual(user?.id.toString(), id.toString()) ? false : true, id);
  const { data: listFriendSent } = useGetListFriendRequestSent(["user", "sent"], true);
  const { data: listFollowers } = useGetListFollowers(["user", "followers"], true);
  const { data: listFollowing, isLoading: loadingFollowing, isError: errorFollowing } = useGetListFollowing(["user", "following"], true);
  // const listFollowersOther = [];
  // const listFollowingOther = [];
  // const listFriendSent = [];
  // const listFriendOther = [];

  const onCreatedListener = (notification) => {
    if (notification?.to?.toString() === user?.id?.toString() && notification?.UserId?.toString() !== user?.id?.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    if (!run) {
      run = true;
      const notifications = await notificationService.find({ query: { to: user?.id } });
      notifications?.data?.forEach(onCreatedListener);
      notificationService.on("created", onCreatedListener);
    }
  };

  useEffect(() => {
    if (!run) {
      nots();
    }

    if (run) {
      return () => {
        // console.log("listenner remove");
        notificationService.removeListener("created", onCreatedListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className=" max-w-screen-2xl">
        <div className="lg:mx-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen py-5">
              <Loader color="black" />
            </div>
          ) : isError ? (
            <div className="py-5 m-auto text-center px-2">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.removeQueries(["user", "otherUser"])}>
                Tap to retry
              </Link>{" "}
            </div>
          ) : user?.id === id ? (
            <ProfileHeader
              user={user}
              otherUser={null}
              listFriendSent={listFriendSent}
              listFollowers={listFollowers}
              listFollowing={listFollowing}
              notificationList={notificationList}
              loadingFollowing={loadingFollowing}
              errorFollowing={errorFollowing}
            />
          ) : (
            <ProfileHeader
              user={user}
              otherUser={otherUser}
              listFriendRequest={listFriendSent}
              listFollowers={listFollowers}
              listFollowing={listFollowing}
              notificationList={notificationList}
              loadingFollowing={loadingFollowing}
              errorFollowing={errorFollowing}
            />
          )}
        </div>

        {/* <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div> */}
      </div>
    </>
  );
};

export default Profil;
