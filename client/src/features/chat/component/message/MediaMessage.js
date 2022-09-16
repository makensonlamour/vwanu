import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import MediaPreview from "./MediaPreview";

const MediaMessage = ({ medias, sender }) => {
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
      <div className="bg-black rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full">
        <MediaPreview
          sender={sender}
          type={type}
          photo={medias[0]}
          imgComponent={
            <div>
              <ReactPlayer
                width="40vh"
                className="w-full"
                url={medias[0]?.original}
                pip={true}
                volume={1}
                playsinline={true}
                controls={true}
                light={true}
              />
              {/* <video
                className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full rounded-lg"
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
      <div className="bg-black rounded-lg bg-cover pt-0 mt-2 flex justify-center items-center w-full">
        <MediaPreview
          sender={sender}
          photo={medias[0]}
          imgComponent={
            <img
              src={medias[0]?.original}
              alt={"post_image_" + medias[0]?.id}
              className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full rounded-lg"
            />
          }
        />
      </div>
    );
  } else if (medias?.length === 2) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-3">
        {" "}
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full ">
                <MediaPreview
                  sender={sender}
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover h-[130px] w-96 object-top rounded-lg"
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
      <div className="grid grid-cols-2 gap-2 pt-3">
        {" "}
        {medias.map((media) => {
          return (
            <>
              <div className="flex w-full ">
                <MediaPreview
                  sender={sender}
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover h-[130px] w-96 object-top rounded-lg"
                    />
                  }
                />
              </div>
            </>
          );
        })}
      </div>
    );
  } else if (medias?.length === 4) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-3 ">
        {" "}
        {medias.map((media) => {
          return (
            <>
              <div className="flex w-full ">
                <MediaPreview
                  sender={sender}
                  photo={media}
                  imgComponent={
                    <img
                      src={media?.original}
                      alt={"post_image_" + media?.id}
                      className=" flex-wrap inline object-cover h-[130px] w-96 object-top rounded-lg"
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
      <div className="grid grid-rows-3 grid-flow-col gap-2 pt-3">
        {medias?.map((media) => {
          return (
            <>
              <div className="flex w-full">
                <MediaPreview
                  sender={sender}
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
      <div className="pb-2">{type === "photo" ? content : contentVideo}</div>
    </>
  );
};

MediaMessage.propTypes = { medias: PropTypes.array.isRequired, sender: PropTypes.string };

export default MediaMessage;
