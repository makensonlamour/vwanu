import React from "react";
import PropTypes from "prop-types";
//core components
import Loader from "../../components/common/Loader";
import { BsThreeDots } from "react-icons/bs";
import ProfileTabs from "../../components/profile/ProfileTabs";

//data

const ProfileHeader = ({ dataUser }) => {
  return (
    <>
      {!dataUser ? (
        <Loader />
      ) : (
        <div className="mx-2 bg-white shadow-lg rounded-lg overflow-hidden lg:w-full">
          <div className="relative">
            <img src={dataUser.user.coverPicture} className="w-full bg-gray-300 h-[150px] lg:h-[250px]" alt="cover_profil" />
            <div className="w-full absolute bottom-0 left-0 z-10 transform translate-y-3/4 lg:w-auto lg:translate-x-1/3 flex justify-center">
              <img
                src={dataUser.user.profilePicture}
                className="bg-gray-400 rounded-full w-[100px] h-[100px] lg:w-[140px] lg:h-[140px]"
                alt="profile_picture"
              />
            </div>
          </div>

          <div className="bg-gray-100 pt-[70px] lg:pt-0 lg:pl-[200px] min-h-[120px]">
            <div className="pr-4 pl-2 py-4 text-center lg:text-left">
              <div className="mb-4 lg:mb-2">
                <h1 className="font-mock text-2xl text-gray-700 inline mr-6 lg:mr-32">
                  {dataUser.user.firstName + " " + dataUser.user.lastName}
                </h1>
                <button className="inline ml-auto">
                  <BsThreeDots size={24} className="text-secondary hover:text-primary" />
                </button>
              </div>
              <button className="btn btn-sm btn-secondary text-base-100 rounded-full mr-2 mb-2 lg:mb-0 hover:bg-primary">Message</button>
              <button className="btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary">
                Send Friend Request
              </button>
              <h4 className="font-mock text-lg text-gray-600 mb-2 lg:0"> 3.5 Friends . 6 mutual </h4>

              <h2 className="font-mock text-gray-500">{dataUser.user.bio ? dataUser.user.bio : ""}</h2>
            </div>
          </div>
          <ProfileTabs />
        </div>
      )}
    </>
  );
};

ProfileHeader.propTypes = { dataUser: PropTypes.object.isRequired };

export default ProfileHeader;
