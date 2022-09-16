import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import ViewPhoto from "../../../features/album/component/ViewPhoto";

const MediaPost = ({ medias }) => {
  const [type, setType] = useState("photo");

  const checkType = () => {
    if (medias[0]?.original.endsWith(".mp4") || medias[0]?.original.endsWith(".mp4")) {
      setType("video");
    }
  };

  useEffect(() => {
    checkType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medias]);

  let content;
  let contentVideo;

  if (type === "video") {
    contentVideo = (
      <div className=" rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full">
        <ViewPhoto
          type={type}
          photo={medias[0]}
          imgComponent={
            <div>
              <ReactPlayer
                className={"h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"}
                url={medias[0]?.original}
                muted={true}
                pip={true}
                volume={1}
                playsinline={true}
                controls={true}
                light={true}
              />
              {/* <video
                className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"
                controls
                alt={medias[0]?.original}
              >
                <source alt={"videos_" + sender?.firstName} src={medias[0]?.original} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            </div>
          }
        />
      </div>
    );
  }

  if (medias?.length === 1) {
    content = (
      <div className=" rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full">
        <ViewPhoto
          photo={medias[0]}
          imgComponent={
            <img
              src={medias[0]?.original}
              alt={"post_image_" + medias[0]?.id}
              className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"
            />
          }
        />
      </div>
    );
  } else if (medias?.length === 2) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-5">
        {" "}
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full ">
                <ViewPhoto
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover h-[100%] w-96 object-top rounded-lg"
                    />
                  }
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else if (medias?.length === 3) {
    content = (
      <div className="grid grid-cols-3 rounded pt-5">
        {" "}
        {medias.map((media, idx) => {
          return (
            <>
              {idx === 1 ? (
                <div className={"w-full col-span-2 p-1 row-span-2"}>
                  <ViewPhoto
                    photo={media}
                    imgComponent={
                      <img
                        src={media?.original}
                        alt={"post_image_" + media?.id}
                        className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                      />
                    }
                  />
                </div>
              ) : (
                <div className={"w-full p-1"}>
                  <ViewPhoto
                    photo={media}
                    imgComponent={
                      <img
                        src={media?.original}
                        alt={"post_image_" + media?.id}
                        className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                      />
                    }
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  } else if (medias?.length === 4) {
    content = (
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-5">
        {" "}
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <ViewPhoto
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover object-center w-full rounded-lg"
                    />
                  }
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
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <ViewPhoto
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover object-center w-full h-48 rounded-lg"
                    />
                  }
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
      <div>{type === "photo" ? content : contentVideo}</div>
    </>
  );
};

MediaPost.propTypes = { medias: PropTypes.array.isRequired, sender: PropTypes.string };

export default MediaPost;
