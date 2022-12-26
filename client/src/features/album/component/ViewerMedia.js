/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "@mantine/core";
import { Slide } from "react-slideshow-image";
import {
  Player,
  BigPlayButton,
  PlayToggle,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import { useMediaQuery } from "@mantine/hooks";

const ViewerMedia = ({ photo, imgComponent, type = "photo", dataPhoto = [], idx = 0 }) => {
  // const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);

  const matches = useMediaQuery("(min-width: 750px)");

  // const { data: listComment } = useGetComment(["comments", "all", photo?.id], photo?.id !== "undefined" ? true : false, photo?.id);

  return (
    <>
      <Modal size={matches ? "55%" : "100%"} centered opened={showModal} onClose={() => setShowModal(false)} title="">
        {/* Modal content */}

        <Slide defaultIndex={idx} autoplay={false} className="flex justify-center items-center w-full h-fit">
          {dataPhoto?.map((item) => {
            return (
              <div key={item?.original} className="each-slide-effect w-full">
                {item?.original.endsWith(".mp4") ||
                item?.original.endsWith(".avi") ||
                item?.original.endsWith(".mov") ||
                item?.original.endsWith(".wmv") ||
                item?.original.endsWith(".flv") ||
                item?.original.endsWith(".f4v") ||
                item?.original.endsWith(".swf") ||
                item?.original.endsWith(".mkv") ||
                item?.original.endsWith(".webm") ||
                item?.original.endsWith(".html5") ||
                item?.original.endsWith(".mpeg-2") ||
                item?.original.endsWith(".avchd") ||
                item?.original.endsWith(".ogv") ||
                item?.original.endsWith(".m3u8") ||
                item?.original.endsWith(".mpd") ||
                item?.original.endsWith(".m4v") ? (
                  <div>
                    <Player
                      poster={item?.original?.replace(".mp4", ".png")}
                      src={item?.original}
                      fluid={false}
                      width={"100%"}
                      height={matches ? 500 : 300}
                    >
                      <BigPlayButton position="center" />
                      <ControlBar autoHide={false} disableDefaultControls={true}>
                        <PlayToggle />
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                        <VolumeMenuButton disabled />
                      </ControlBar>
                    </Player>
                  </div>
                ) : (
                  <div className="" style={{ display: "flex", justifyItems: "center" }}>
                    <img
                      src={item?.original}
                      className="bg-black mx-auto object-contain flex justify-center h-[80vh] w-full"
                      alt={"_img_" + item?.id}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Slide>
      </Modal>
      <button onClick={() => setShowModal(true)} className="">
        <div className="">{imgComponent}</div>
      </button>
    </>
  );
};

ViewerMedia.propTypes = {
  photo: PropTypes.object.isRequired,
  imgComponent: PropTypes.any,
  type: PropTypes.string,
};

export default ViewerMedia;
