import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import PropTypes from "prop-types";

const PreviewShareBlog = ({ data }) => {
  return (
    <div className="mt-2">
      <a href={"../../blogs/" + data?.id} className="w-full mt-1 h-32 sm:h-40 lg:h-48 bg-placeholder-color">
        <div className="w-full rounded-t-lg">
          <img
            alt={data?.title}
            src={data?.coverPicture}
            className="w-full h-32 sm:h-40 lg:h-48 object-cover border border-gray-200 rounded-t-lg px-[0.5px]"
          />
        </div>
        <div className="w-full p-2 border-b rounded-b-lg border-r border-l border-gray-200 bg-placeholder-color">
          <p className="font-semibold text-sm sm:text-md">{data?.title}</p>
          <p className="text-gray-600 text-sm sm:text-md">
            <AiOutlineLink className="inline mr-2" size={"20px"} />
            {window.location.href + "/blogs/" + data?.id}
          </p>
        </div>
      </a>
    </div>
  );
};

PreviewShareBlog.propTypes = { data: PropTypes.object.isRequired };

export default PreviewShareBlog;
