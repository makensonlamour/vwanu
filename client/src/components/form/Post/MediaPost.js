import React from "react";
import PropTypes from "prop-types";

const MediaPost = ({ medias }) => {
  let content;
  if (medias.length === 1) {
    content = (
      <div className="pt-5 flex w-full">
        <img
          src={medias[0].original}
          alt={"post_image_" + medias[0]?.id}
          className=" flex-wrap inline object-cover object-center w-full rounded-lg"
        />
      </div>
    );
  } else if (medias.length === 2) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-5">
        {" "}
        {medias.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <img
                  src={media.original}
                  alt={"post_image_" + media?.id}
                  className=" flex-wrap inline object-cover object-center w-full rounded-lg"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else if (medias.length === 3) {
    content = (
      <div className="grid grid-cols-3 rounded pt-5">
        {" "}
        {medias.map((media, idx) => {
          return (
            <>
              {idx === 1 ? (
                <div className={"w-full col-span-2 p-1 row-span-2"}>
                  <img
                    src={media.original}
                    alt={"post_image_" + media?.id}
                    className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                  />
                </div>
              ) : (
                <div className={"w-full p-1"}>
                  <img
                    src={media.original}
                    alt={"post_image_" + media?.id}
                    className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  } else if (medias.length === 4) {
    content = (
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-5">
        {" "}
        {medias.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <img
                  src={media.original}
                  alt={"post_image_" + media?.id}
                  className=" flex-wrap inline object-cover object-center w-full rounded-lg"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-rows-3 grid-flow-col gap-2 pt-5">
        {" "}
        {medias.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <img
                  src={media.original}
                  alt={"post_image_" + media?.id}
                  className=" flex-wrap inline object-cover object-center w-full h-48 rounded-lg"
                />
              </div>
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

MediaPost.propTypes = { medias: PropTypes.array.isRequired };

export default MediaPost;
