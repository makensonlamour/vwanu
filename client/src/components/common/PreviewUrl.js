import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import PropTypes from "prop-types";

const PreviewUrl = ({ url }) => {
  const urlData = "";
  return (
    <>
      {urlData ? (
        <a
          href={"https://" + urlData?.domain}
          rel="noopener noreferrer"
          target="_blank"
          className="w-full h-28 border border-gray-200 flex items-center rounded-box bg-placeholder-color"
        >
          <div className="w-48 rounded-l-xl border-r border-gray-200">
            <img alt={urlData?.title} src={urlData?.img} className="w-48 h-28 rounded-l-xl px-[0.5px]" />
          </div>
          <div className="w-[90%] px-4">
            <p className="font-semibold">{urlData?.title}</p>
            <p className="line-clamp-2 text-gray-600">{urlData?.description}</p>
            <p className="text-gray-600">
              <AiOutlineLink className="inline mr-2" size={"20px"} />
              {"https://" + urlData?.domain}
            </p>
          </div>
        </a>
      ) : (
        <a rel="noopener noreferrer" target="_blank" href={url} className="font-bold hover:text-primary">
          {url}
        </a>
      )}
    </>
  );
};

PreviewUrl.propTypes = { url: PropTypes.string.isRequired };

export default PreviewUrl;
