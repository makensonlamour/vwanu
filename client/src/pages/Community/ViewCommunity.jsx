import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
// import { useQueryClient } from "react-query";
// import _ from "lodash";

import client from "../../features/feathers";
import { useGetCommunity } from "../../features/community/communitySlice";

//Core components
// import Loader from "../../components/common/Loader";
import CommunityHeader from "../../components/Community/CommunityHeader";

const ViewCommunity = () => {
  let run = false;
  // const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: community } = useGetCommunity(["community", id], id !== undefined ? true : false, id);
  const user = useOutletContext();
  const [notificationList, setNotificationList] = useState([]);

  // const communityData = {};

  // if (_.isEqual(user?.id.toString(), id.toString())) {
  //   queryClient.removeQueries(["user", "otherUser"]);
  // }

  const onCreatedListener = (notification) => {
    if (notification.to.toString() === user.id.toString() && notification?.UserId?.toString() !== user.id.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    if (!run) {
      run = true;
      const notifications = await notificationService.find({ query: { to: user.id } });
      notifications.forEach(onCreatedListener);
      notificationService.on("created", onCreatedListener);
    }
  };

  useEffect(() => {
    if (!run) {
      nots();
    }

    if (run) {
      return () => {
        console.log("listenner remove");
        notificationService.removeListener("created", onCreatedListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl">
        <div className="lg:mx-1">
          {<CommunityHeader user={user} communityData={community?.data} otherUser={null} notificationList={notificationList} />}
        </div>
      </div>
    </>
  );
};

export default ViewCommunity;
