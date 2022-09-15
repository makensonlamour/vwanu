import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CommentForm from "../../comment/component/CommentForm";
import ReactPlayer from "react-player";

// import { useGetComment } from "../../comment/commentSlice";

const ViewPhoto = ({ photo, imgComponent, type = "photo" }) => {
  // const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  // const { data: listComment } = useGetComment(["comments", "all", photo?.id], photo?.id !== "undefined" ? true : false, photo?.id);
  return (
    <>
      <button onClick={() => setShowModal(true)} className="">
        <div className=" ">{imgComponent}</div>
      </button>
      {showModal && (
        <div className="justify-center flex overflow-x-hidden overflow-y-auto scrollbar inset-0 fixed bg-black bg-opacity-[0.95] h-full w-full z-50 outline-none focus:outline-none">
          <div className="relative w-full ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
              <div className="flex items-start justify-between px-5 py-3 border-solid rounded-t">
                <p className="text-lg font-medium"></p>
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
                    <ReactPlayer url={photo?.original} pip={true} playing={true} volume={1} playsinline={true} controls={true} />
                    {/* <video
                      className="h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"
                      controls
                      alt={photo.original}
                    >
                      <source alt={"videos_" + photo?.id} src={photo.original} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video> */}
                  </div>
                )}
                {/*} <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-96 top-1/2">
                    <a href="#slide1" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide3" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
      {*/}
              </div>
              <div className="basis-[40%] bg-white">
                <div className="px-4 py-2">
                  <div className="flex items-center mb-3">
                    <img
                      src={photo?.User?.profilePicture}
                      className="w-[38px] h-[38px] mask mask-squircle object-cover mr-2"
                      alt={"_profile" + photo?.User?.firstName}
                    />
                    <div className="">
                      <Link to={"../../profile/" + photo?.User?.id} className="text-primary">
                        {photo?.User?.firstName + " " + photo?.User?.lastName} <span className="text-gray-800">{" posted an update"}</span>
                      </Link>
                      <div className="">
                        <span className="">{format(new Date(photo?.createdAt), "MMM dd, yyyy")}</span>{" "}
                        <span className="">{" • Public"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  <div className="">
                    <CommentForm PostId={photo?.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ViewPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  imgComponent: PropTypes.any,
  type: PropTypes.string,
};

export default ViewPhoto;
