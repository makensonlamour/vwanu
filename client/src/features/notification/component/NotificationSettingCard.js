import React, { useState } from "react";
import Switch from "react-switch";

const NotificationSettingsCard = () => {
  const [notifications, setNotifications] = useState({
    disableAll: false,
    settings: {
      profile: { normal: true, email: false, sms: false },
      message: { normal: true, email: false, sms: false },
      post: { normal: true, email: false, sms: false },
      comment: { normal: true, email: false, sms: false },
      reaction: { normal: true, email: false, sms: false },
      forum: { normal: true, email: false, sms: false },
      community: { normal: true, email: false, sms: false },
      friend: { normal: true, email: false, sms: false },
      blog: { normal: true, email: false, sms: false },
    },
  });

  const handleToggle = (category, type) => {
    setNotifications((prevState) => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        [category]: {
          ...prevState.settings[category],
          [type]: !prevState.settings[category][type],
        },
      },
    }));
  };

  const handleDisableAll = () => {
    setNotifications((prevState) => ({
      ...prevState,
      disableAll: !prevState.disableAll,
    }));
  };

  const renderSwitch = (category, type) => (
    <Switch
      onChange={() => handleToggle(category, type)}
      checked={notifications.settings[category][type]}
      disabled={notifications.disableAll}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Notification Preferences</h2>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" checked={notifications.disableAll} onChange={handleDisableAll} className="mr-2" />
          <span>Do Not Disturb</span>
        </label>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2"> </th>
            <th className="w-1/4 px-4 py-2">Normal</th>
            <th className="w-1/4 px-4 py-2">Email</th>
            <th className="w-1/4 px-4 py-2">Sms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Profile notifications</td>
            <td className="border px-4 py-2">{renderSwitch("profile", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("profile", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("profile", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Message notifications</td>
            <td className="border px-4 py-2">{renderSwitch("message", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("message", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("message", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Post notifications</td>
            <td className="border px-4 py-2">{renderSwitch("post", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("post", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("post", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Comment notifications</td>
            <td className="border px-4 py-2">{renderSwitch("comment", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("comment", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("comment", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Reaction notifications</td>
            <td className="border px-4 py-2">{renderSwitch("reaction", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("reaction", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("reaction", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Forum notifications</td>
            <td className="border px-4 py-2">{renderSwitch("forum", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("forum", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("forum", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Community notifications</td>
            <td className="border px-4 py-2">{renderSwitch("community", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("community", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("community", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Friend notifications</td>
            <td className="border px-4 py-2">{renderSwitch("friend", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("friend", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("friend", "sms")}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Blog notifications</td>
            <td className="border px-4 py-2">{renderSwitch("blog", "normal")}</td>
            <td className="border px-4 py-2">{renderSwitch("blog", "email")}</td>
            <td className="border px-4 py-2">{renderSwitch("blog", "sms")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotificationSettingsCard;
