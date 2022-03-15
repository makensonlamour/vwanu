import React from "react";
import { Link } from "react-router-dom";
//core components
import { BsThreeDots } from "react-icons/bs";

//data

const ProfileHeader = () => {
  return (
    <>
      <div className="mx-4 bg-white shadow-lg rounded-lg overflow-hidden lg:w-full">
        <div className="relative">
          <canvas className="w-full bg-gray-300 h-[150px] lg:h-[250px]"></canvas>
          <div className="w-full absolute bottom-0 left-0 z-10 transform translate-y-3/4 lg:w-auto lg:translate-x-1/3 flex justify-center">
            <canvas className="bg-gray-400 rounded-full w-[100px] h-[100px] lg:w-[140px] lg:h-[140px]"></canvas>
          </div>
        </div>

        <div className="bg-gray-100 pt-[90px] lg:pt-0 lg:pl-[200px] min-h-[120px]">
          <div className="pr-4 pl-2 py-4 text-center lg:text-left">
            <div className="mb-4 lg:mb-2">
              <h1 className="font-mock text-2xl text-gray-700 inline mr-6 lg:mr-32">Yves Gervens Constant</h1>
              <button className="inline ml-auto">
                <BsThreeDots size={24} className="text-secondary hover:text-primary" />
              </button>
            </div>
            <button className="btn btn-sm btn-secondary text-base-100 rounded-full mr-2 mb-2 lg:mb-0 hover:bg-primary">Message</button>
            <button className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary">
              Send Friend Request
            </button>
            <h4 className="font-mock text-lg text-gray-600 mb-2 lg:0"> 3.5 Friends . 6 mutual </h4>

            <h2 className="font-mock text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            </h2>
          </div>
        </div>
        <div className="tabs bg-gray-100">
          <Link to="#" className="tab border-b-2 border-secondary text-secondary font-semibold hover:text-primary">
            Post
          </Link>
          <Link to="#" className="tab font-semibold">
            About
          </Link>
          <Link to="#" className="tab font-semibold">
            Friends
          </Link>
          <Link to="#" className="tab font-semibold">
            Photos
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
