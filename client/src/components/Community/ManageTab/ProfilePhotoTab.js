import React, { useState } from "react";
import ProfilePhotoEdit from "../ProfilePhotoTab/ProfilePhotoEdit";

const ProfilePhotoTab = () => {
  const [data, setData] = useState([]);
  return (
    <>
      <div className="bg-white border border-gray-300 py-2 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-2 text-lg font-semibold pt-10">{`Profile Photo`}</h4>
        <ProfilePhotoEdit setData={setData} data={data} />
      </div>
    </>
  );
};

export default ProfilePhotoTab;
