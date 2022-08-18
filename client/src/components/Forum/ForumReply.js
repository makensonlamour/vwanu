import React, { useState } from "react";

const ForumReply = () => {
  const [over, setOver] = useState(false);
  return (
    <>
      <div onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)} className="hover:bg-gray-100 px-4 py-6">
        <div className="flex justify-between">
          <div className="flex">
            <div className="">
              <img src={""} alt="_profile_picture" className="w-12 h-12 border mask mask-squircle" />
            </div>
            <div className="ml-2">
              <p className="font-[400] align-middle">Joseph</p>
              <p className=""></p>
            </div>
          </div>
          {over && (
            <div className="">
              <button className="mr-2">share</button>
              <button className="">more actions</button>
            </div>
          )}
        </div>
        <div className="">
          <p className="">{`You likely have Outlook assigned via Intune, and because the app deployment is managed via MDM, it’s removed when the device is unenrolled.

There’s a new option to leave apps behind when unenrolled now. ‘uninstall on device removal’. You can choose yes or no on this when looking at your app assignment settings for outlook mobile.`}</p>
        </div>
      </div>
    </>
  );
};

export default ForumReply;
