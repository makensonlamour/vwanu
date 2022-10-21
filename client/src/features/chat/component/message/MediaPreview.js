import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const MediaPreview = ({ photo, imgComponent, sender, type = "photo" }) => {
  // const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);

  // const { data: listComment } = useGetComment(["comments", "all", photo?.id], photo?.id !== "undefined" ? true : false, photo?.id);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="">
        <div className="">{imgComponent}</div>
      </button>
      {showModal && (
        <div className="z-50 justify-center flex overflow-x-auto overflow-y-auto scrollbar inset-0 fixed bg-black bg-opacity-[0.95] h-full w-full outline-none focus:outline-none">
          <div className="relative w-full ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
              <div className="flex items-center justify-between px-5 py-3 border-solid rounded-t">
                <p className="text-white text-md">
                  Media sent by <span className="">{sender?.firstName + " " + sender?.lastName}</span>
                </p>
                <button onClick={() => setShowModal(false)} className="text-3xl text-white font-medium">
                  x
                </button>
              </div>
              <div className="flex flex-col md:flex-row p-3 justify-center">
                {type === "photo" ? (
                  <div className="basis-[60%] bg-black">
                    <img
                      src={photo?.original}
                      className="px-5 bg-black mx-auto object-contain h-[570px] basis-[70%]"
                      alt={"_img_" + photo?.id}
                    />
                  </div>
                ) : (
                  <div>
                    <ReactPlayer
                      url={photo?.original}
                      pip={true}
                      playing={true}
                      volume={1}
                      playsinline={true}
                      controls={true}
                      loop={true}
                    />
                    {/* <video
                      className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"
                      controls
                      alt={photo.original}
                    >
                      <source alt={"videos_" + sender?.firstName} src={photo.original} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MediaPreview.propTypes = {
  photo: PropTypes.object.isRequired,
  imgComponent: PropTypes.any,
  sender: PropTypes.object,
  type: PropTypes.string,
};

export default MediaPreview;
