import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cover_forum from "../../assets/images/forum_cover_picture.png";
// import { format } from "date-fns";

const ViewCategory = ({ data }) => {
  return (
    <>
      <Link
        to={`../forums/${data?.id}`}
        key={data?.name}
        className="bg-white w-full lg:w-[30%] mb-6 rounded-xl border border-gray-100 hover:shadow-lg"
      >
        <div className="bg-gray-700 rounded-t-xl">
          {data?.coverPicture !== null ? (
            <img src={data?.coverPicture} alt={data?.name} className="w-full h-36 object-cover rounded-t-xl" />
          ) : (
            <div className="w-full h-36 object-cover rounded-t-xl">
              <img src={cover_forum} alt={data?.name} className="w-full h-36 object-cover rounded-t-xl" />
            </div>
          )}
        </div>
        <div className="px-4 pt-3">
          <p className="text-xl font-semibold text-left pb-2">{data?.name}</p>
          {data?.description === "" ? <p className="py-5"></p> : <p className="line-clamp-2 text-sm font-normal">{data?.description}</p>}
        </div>
        <div className="p-4 flex items-end">
          {/* <p className="text-gray-500 text-sm font-[400] self-end">{data && format(new Date(data?.createdAt), "MMM dd, yyyy")}</p> */}
        </div>
      </Link>
    </>
  );
};

ViewCategory.propTypes = {
  data: PropTypes.array,
};

export default ViewCategory;
