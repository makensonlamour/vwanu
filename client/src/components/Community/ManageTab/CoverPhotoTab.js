import React, { useState } from "react";
import CoverPhotoEdit from "../CoverPhotoTab/CoverPhotoEdit";

const CoverPhotoTab = () => {
  const [data, setData] = useState([]);
  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold text-primary">{`Cover Photo`}</h4>
        <CoverPhotoEdit data={data} setData={setData} />
      </div>
    </>
  );
};

export default CoverPhotoTab;
