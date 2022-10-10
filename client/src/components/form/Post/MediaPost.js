/*eslint-disable*/
import React, { useState, useEffect } from "react";
// import { Player } from "video-react";
// import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import ViewPhoto from "../../../features/album/component/ViewPhoto";
import { isMobile } from "react-device-detect";
import VideoPlayer from "react-videoplayer";

const MediaPost = ({ medias, post }) => {
  const [type, setType] = useState("photo");

  const checkType = () => {
    if (medias[0]?.original.endsWith(".mp4") || medias[0]?.original.endsWith(".mp4")) {
      setType("video");
    }
  };

  function transformImgSingle(url, postNumber) {
    if (!url) return "";
    if (isMobile && postNumber === 1) return url;
    const arrayUrl = url.split("/");

    arrayUrl.splice(6, 0, "q_100");
    if (postNumber === 1) {
      arrayUrl.splice(7, 0, "b_auto:predominant,c_pad,h_1200,w_1400");
    } else {
      arrayUrl.splice(7, 0, "b_auto:predominant,c_pad,h_1200,w_1200");
    }

    return arrayUrl.join("/");
  }

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
          data={post}
          photo={medias[0]}
          imgComponent={
            <div className="w-[0px] object-cover">
              {/* <VideoPlayer
                width={10}
                style={{ borderRadius: "10px" }}
                className={"rounded-lg"}
                videoSrc={medias[0]?.original}
                autoPlay={false}
                muted={true}
                videoVolume={100}
                defaultBrowserControls={true}
                customHtmlControls={false}
              /> */}
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
          data={post}
          photo={medias[0]}
          imgComponent={
            <img
              src={transformImgSingle(medias[0]?.original, 1)}
              alt={"post_image_" + medias[0]?.id}
              className="flex-wrap inline object-cover h-auto max-h-[630px] object-center w-[100%] rounded-xl"
            />
          }
        />
      </div>
    );
  } else if (medias?.length === 2) {
    content = (
      <div className="grid grid-cols-2 gap-2 pt-5">
        {" "}
        {medias?.map((media, idx) => {
          return (
            <>
              <div className="flex w-full ">
                <ViewPhoto
                  idxImg={idx}
                  data={post}
                  photo={media}
                  imgComponent={
                    <img
                      src={transformImgSingle(media?.original, 2)}
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
                    data={post}
                    photo={media}
                    imgComponent={
                      <img
                        src={transformImgSingle(media?.original, 3)}
                        alt={"post_image_" + media?.id}
                        className={"flex-wrap inline object-cover object-center w-full rounded-lg "}
                      />
                    }
                  />
                </div>
              ) : (
                <div className={"w-full p-1"}>
                  <ViewPhoto
                    idxImg={idx}
                    data={post}
                    photo={media}
                    imgComponent={
                      <img
                        src={transformImgSingle(media?.original, 3)}
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
        {medias?.map((media, idx) => {
          return (
            <>
              <div className="flex w-full">
                <ViewPhoto
                  idxImg={idx}
                  data={post}
                  photo={media}
                  imgComponent={
                    <img
                      src={transformImgSingle(media?.original, 4)}
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
                  data={post}
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

MediaPost.propTypes = { medias: PropTypes.array.isRequired, sender: PropTypes.string, post: PropTypes.object };

export default MediaPost;
