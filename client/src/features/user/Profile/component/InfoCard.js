import React from "react";
import PropTypes from "prop-types";
import { IoEyeSharp } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { FaGlobeAmericas, FaBirthdayCake } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";

const InfoCard = ({ user, otherUser }) => {
  return (
    <>
      <div className="block mx-auto mr-0 lg:mr-2 w-full mb-4">
        {!otherUser ? (
          <ul className="lg:ml-2 px-3 py-2 border rounded-2xl bg-white">
            <li className="text-primary font-semibold">Profile complete 70%</li>
            <progress className="progress w-56 progress-primary" value="70" max="100"></progress>
            <li className="align-middle line-through">
              <input type="radio" className="mr-2 h-6 w-6 align-middle " checked={true} readOnly={true} />
              Add profile Picture
            </li>
            <li className="align-middle">
              {" "}
              <input type="radio" className="mr-2 h-6 w-6 align-middle" checked={false} readOnly={true} />
              Add profile Cover Picture
            </li>
            <li className="align-middle">
              {" "}
              <input type="radio" className="mr-2 h-6 w-6 align-middle" checked={false} readOnly={true} />
              Add date of birth, location
            </li>
          </ul>
        ) : null}

        <ul className="mt-2 lg:ml-2 px-3 py-2 border rounded-2xl bg-white text-secondary">
          <li className="text-green-500 font-semibold block py-1 align-middle">
            <p className="inline-flex">
              <IoEyeSharp size={"20px"} className="mr-2 align-middle" />
              Status: Online
            </p>
          </li>
          <li className="font-semibold block py-1 items-center">
            <p className="inline-flex">
              <BsGenderAmbiguous size={"20px"} className="mr-2 items-center" />
              Gender: {otherUser ? (otherUser?.gender === "m" ? "male" : "female") : user?.gender === "m" ? "male" : "female"}
            </p>
          </li>
          <li className="font-semibold block py-1">
            <p className="inline-flex">
              <ImLocation size={"20px"} className="mr-2" /> Currently living in {otherUser ? otherUser?.country : user?.country}
            </p>
          </li>
          <li className="font-semibold block py-1">
            <p className="inline-flex">
              <FaGlobeAmericas size={"20px"} className="mr-2" /> Country from {otherUser ? otherUser?.country : user?.country}
            </p>
          </li>
          <li className="font-semibold block py-1">
            <p className="inline-flex">
              <FaBirthdayCake size={"20px"} className="mr-2" /> Birthday {otherUser ? otherUser?.birthday : user?.birthday}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

InfoCard.propTypes = {
  user: PropTypes.object.isRequired,
  otherUser: PropTypes.object,
};

export default InfoCard;
