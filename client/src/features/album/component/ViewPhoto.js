import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, Link } from "react-router-dom";
import { format } from "date-fns";

const ViewPhoto = ({ photo, imgComponent }) => {
  const user = useOutletContext();
  const [showModal, setShowModal] = useState(false);
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
                <div className="basis-[60%] bg-black">
                  <img
                    src={photo?.original}
                    className="px-5 bg-black mx-auto object-contain h-[570px] basis-[70%]"
                    alt={"_img_" + photo?.id}
                  />
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
                    <div className="flex items-center">
                      <img
                        src={user?.profilePicture?.original}
                        className="w-[38px] h-[38px] mask mask-squircle object-cover mr-2"
                        alt={"_profile" + user?.firstName}
                      />
                      <div className="">
                        <Link to={"../../profile/" + user?.id} className="text-primary">
                          {user?.firstName + " " + user?.lastName} <span className="text-gray-800">{" posted an update"}</span>
                        </Link>
                        <div className="">
                          <span className="">{format(new Date(user?.createdAt), "MMM dd, yyyy")}</span>{" "}
                          <span className="">{" • Public"}</span>
                        </div>
                      </div>
                    </div>
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
};

export default ViewPhoto;
