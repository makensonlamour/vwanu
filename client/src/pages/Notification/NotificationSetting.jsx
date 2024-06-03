import React from "react";
import NotificationSettingCard from "../../features/notification/component/NotificationSettingCard";

const NotificationSetting = () => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8 mb-8">
        <h2 className="my-3 px-3 text-xl font-medium">Notifications</h2>
      </div>
      <div>
        <NotificationSettingCard />
      </div>
    </>
  );
};

export default NotificationSetting;
