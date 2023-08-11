import React from "react";
// eslint-disable-next-line no-unused-vars
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Asset_2.png";

const CommunityGuidelines = () => {
  return (
    <div className="px-10 w-full">
      <div className="mx-auto flex justify-between items-center my-5">
        <div className="basis-[28%] md:basis-[12%] ">
          <Link className="" to="../">
            <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
              {" "}
              <img className="justify-center" src={logo} alt="logo_vwanu" />
            </div>
          </Link>
        </div>
        <div className="space-x-5">
          <Link to="#" className="text-primary hover:text-secondary font-semibold">
            Community Guidelines Archives
          </Link>
          {/* <button className="px-6 bg-primary text-white rounded-full py-2 hover:bg-secondary text-md">Download Pdf</button> */}
        </div>
      </div>
      <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-52 rounded-xl mx-auto flex items-center justify-center align-middle flex-col">
        <div className="">
          <p className="text-5xl text-white align-middle font-semibold mx-auto">COMMUNITY GUIDELINES</p>
          <p className="py-6 font-semibold mx-auto text-white">Effective: January 28, 2023</p>
          <p className="font-semibold mx-auto text-white italic text-sm">This Document is last updated on August 20, 2021</p>
        </div>
      </div>
    </div>
  );
};

// CommunityGuidelines.propTypes = {};

export default CommunityGuidelines;
