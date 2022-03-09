import React from "react";
//import * as Yup from "yup";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
import routesPath from "../../routesPath";
//import { getAlerts } from "../../store/alerts";

// Core components
import { MdMarkEmailRead } from "react-icons/md";
import { MdInfo } from "react-icons/md";
//import Alerts from "../../components/common/Alerts";
//import { Field, Form, Submit } from "../../components/form";
//import { forgotPassword } from "../../store/auth";

const VerifiedEmailScreen = () => {
  //const dispatch = useDispatch();
  //const alerts = useSelector(getAlerts);

  //const handleResetPasword = (credentials) => dispatch(forgotPassword(credentials));
  const isVerified = false;
  return (
    <>
      <div className="">
        <div className="mt-10 mx-10">
          {isVerified ? (
            <div className="bg-success shadow-3xl rounded-3xl px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <px className="">
                <MdMarkEmailRead size="48" className="m-auto text-green-600" />
              </px>
              <p className="text-green-600 text-center font-semibold mt-4">Your email has been verified succesfully.</p>
            </div>
          ) : (
            <div className="bg-info shadow-3xl rounded-3xl px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <px className="">
                <MdInfo size="48" className="m-auto text-blue-600" />
              </px>
              <p className="text-blue-600 text-center font-semibold mt-4">Your email has already verified.</p>
            </div>
          )}

          <div className="m-auto text-center mt-16">
            <Link className="text-primary font-bold mt-10 text-center" to={routesPath.NEWSFEED}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifiedEmailScreen;
