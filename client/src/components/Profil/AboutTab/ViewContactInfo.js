import React from "react";
import Proptypes from "prop-types";
import { AiOutlineMail, AiOutlineLink, AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMaleFemale, IoLanguageOutline } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";

const ViewContactInfo = ({ user }) => {
  return (
    <>
      <div>
        <ul className="my-2">
          <h1 className="text-primary py-2">Contact Info</h1>
          {user?.email ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <AiOutlineMail size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.email}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Email</p>
            </li>
          ) : null}

          {user?.telephone ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <BsFillTelephoneFill size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.telephone}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Telephone</p>
            </li>
          ) : null}
        </ul>

        <ul className="my-2">
          <h1 className="text-primary py-2">Websites and social Links</h1>
          {user?.website ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <AiOutlineLink size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.website}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Website</p>
            </li>
          ) : null}

          {user?.facebook ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <AiOutlineFacebook size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.facebook}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Facebook</p>
            </li>
          ) : null}
          {user?.instagram ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <AiOutlineInstagram size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.instagram}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Instagram</p>
            </li>
          ) : null}
          {user?.twitter ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <AiOutlineTwitter size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.twitter}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Twitter</p>
            </li>
          ) : null}
        </ul>

        <ul className="my-2">
          <h1 className="text-primary py-2">Basic Info</h1>
          {user?.website ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <IoMaleFemale size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.gender === "m" ? "Male" : "Female"}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Gender</p>
            </li>
          ) : null}

          {user?.birthday ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <FaBirthdayCake size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.birthday}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Birth date</p>
            </li>
          ) : null}
          {user?.language ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <IoLanguageOutline size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.language}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Languages</p>
            </li>
          ) : null}
          {user?.interestedBy ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <IoMaleFemale size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.interestedBy === "m" ? "Male" : "Female"}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Interest in</p>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

ViewContactInfo.propTypes = {
  user: Proptypes.object,
};

export default ViewContactInfo;
