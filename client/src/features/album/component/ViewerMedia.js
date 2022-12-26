/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import ResponsivePlayer from "../../../components/common/ResponsivePlayer";
import { Modal, useMantineTheme } from "@mantine/core";

const ViewerMedia = ({ photo, imgComponent, type = "photo" }) => {
  // const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const theme = useMantineTheme();

  // const { data: listComment } = useGetComment(["comments", "all", photo?.id], photo?.id !== "undefined" ? true : false, photo?.id);

  return (
    <>
      <Modal
        overlayColor={"#000"}
        sx={{ backgroundColor: "#000" }}
        overlayOpacity={0.95}
        opened={showModal}
        onClose={() => setShowModal(false)}
        title=""
        fullScreen
      >
        {/* Modal content */}
        <div style={{ display: "flex", justifyContent: "center" }} className="flex justify-center items-center">
          {type === "photo" ? (
            <div className="bg-black">
              <img src={photo?.original} className="px-5 bg-black mx-auto object-contain h-[100vh] " alt={"_img_" + photo?.id} />
            </div>
          ) : (
            <div className="w-full">
              <ResponsivePlayer url={photo?.original} autoplay={true} muted={true} volume={1} />
            </div>
          )}
        </div>
      </Modal>
      <button onClick={() => setShowModal(true)} className="">
        <div className="">{imgComponent}</div>
      </button>
      {/* <button onClick={() => setShowModal(true)} className="">
        <div className="">{imgComponent}</div>
      </button>
      {showModal && (
        <div className="relative w-full my-6 mx-auto max-w-md lg:max-w-lg">
          {/*content}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header}
            <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
              <p className="text-lg font-medium text-primary"></p>
              <button onClick={() => setShowModal(false)} className="text-lg font-medium">
                x
              </button>
            </div>
            <div className="relative p-3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col lg:flex-row lg:flex-wrap lg:justify-center w-full items-center outline-none focus:outline-none">
                <div className="flex flex-col md:flex-row p-3 justify-center">
                  {type === "photo" ? (
                    <div className="bg-black">
                      <img src={photo?.original} className="px-5 bg-black mx-auto object-contain h-[80vh] " alt={"_img_" + photo?.id} />
                    </div>
                  ) : (
                    <div className="w-full h-[80vh]">
                      <ResponsivePlayer url={photo?.original} autoplay={true} muted={true} volume={1} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

ViewerMedia.propTypes = {
  photo: PropTypes.object.isRequired,
  imgComponent: PropTypes.any,
  type: PropTypes.string,
};

export default ViewerMedia;
