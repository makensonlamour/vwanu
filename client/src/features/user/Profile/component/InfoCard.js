import React from "react";
import { useOutletContext } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { FaGlobeAmericas, FaBirthdayCake } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";

const InfoCard = () => {
  const user = useOutletContext();
  return (
    <>
      <div className="block mx-auto mr-0 lg:mr-2 w-full mb-4">
        <ul className="lg:ml-2 px-3 py-2 border rounded-2xl bg-white">
          <li className="text-primary font-semibold">Profile complete 70%</li>
          <progress className="progress w-56 progress-primary" value="70" max="100"></progress>
          <li className="align-middle line-through">
            <input type="radio" className="mr-2 h-6 w-6 align-middle " checked={true} />
            Add profile Picture
          </li>
          <li className="align-middle">
            {" "}
            <input type="radio" className="mr-2 h-6 w-6 align-middle" checked={false} />
            Add profile Cover Picture
          </li>
          <li className="align-middle">
            {" "}
            <input type="radio" className="mr-2 h-6 w-6 align-middle" checked={false} />
            Add date of birth, location
          </li>
        </ul>

        <ul className="mt-2 lg:ml-2 px-3 py-2 border rounded-2xl bg-white text-secondary">
          <li className="text-green-500 font-semibold inline-flex py-1 align-middle">
            <IoEyeSharp size={"20px"} className="mr-2 align-middle" />
            Status: Online
          </li>
          {console.log(user)}
          <li className="font-semibold inline-flex py-1 items-center">
            <BsGenderAmbiguous size={"20px"} className="mr-2 items-center" />
            Gender: {user.gender === "m" ? "male" : "female"}
          </li>
          <li className="font-semibold inline-flex py-1">
            {" "}
            <ImLocation size={"20px"} className="mr-2" /> Currently living in {user.country}
          </li>
          <li className="font-semibold inline-flex py-1">
            <FaGlobeAmericas size={"20px"} className="mr-2" /> Country from {user.country}
          </li>
          <li className="font-semibold inline-flex py-1">
            <FaBirthdayCake size={"20px"} className="mr-2" /> Birthday {user.birthday}
          </li>
        </ul>
      </div>
    </>
  );
};

export default InfoCard;
