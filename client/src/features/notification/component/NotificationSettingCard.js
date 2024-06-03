import React, { useState } from "react";

const NotificationSettingCard = ({}) => {
  const [isNotif, SetIsNotif] = useState(false);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-blue-500 font-semibold">Profile</span>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Notification</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input onChange={() => SetIsNotif(!isNotif)} type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      {!isNotif && (i
        <div className="flex items-center mb-4">
          <label className="mr-2">
            <input type="checkbox" className="mr-1" />
            Email
          </label>
          <label>
            <input type="checkbox" className="mr-1" />
            SMS
          </label>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingCard;
