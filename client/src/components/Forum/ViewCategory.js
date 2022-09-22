import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ViewCategory = ({ data }) => {
  return (
    <>
      <div className="flex justify-evenly flex-wrap px-4 lg:mx-36">
        {data?.length > 0 &&
          data?.map((category) => {
            return (
              <Link
                to={`../forums/${category?.name}`}
                key={category?.name}
                className="bg-white w-full lg:w-[30%] mb-6 rounded-xl border border-gray-100 hover:shadow-lg"
              >
                <div className="bg-gray-700 rounded-t-xl">
                  {category?.coverPicture !== null && (
                    <img src={category?.coverPicture} alt={category?.name} className="w-full h-36 object-cover rounded-t-xl" />
                  )}
                </div>
                <div className="px-4 pt-3">
                  <p className="text-xl font-semibold text-left pb-2">{category?.name}</p>
                  {category?.description === "" ? (
                    <p className="py-5"></p>
                  ) : (
                    <p className="line-clamp-2 text-sm font-normal">{category?.description}</p>
                  )}
                </div>
                <div className="p-4 flex items-end">
                  <p className="text-gray-500 text-sm font-[400] self-end">{category?.date}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

ViewCategory.propTypes = {
  data: PropTypes.array,
};

export default ViewCategory;
