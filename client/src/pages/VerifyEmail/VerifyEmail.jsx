import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import routesPath from "../../routesPath";
import _ from "lodash";

//RTK query
import { useVerifyEmailMutation } from "../../features/api/apiSlice";

// Core components
import Loader from "../../components/common/Loader";
import { MdMarkEmailRead } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { VscError } from "react-icons/vsc";

const VerifyEmailScreen = () => {
  const { id, activationKey } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [dataObject, setDataObject] = useState({ id, activationKey });
  const [verifyEmail, { isLoading, isSuccess, error }] = useVerifyEmailMutation({ id, activationKey });

  useEffect(() => {
    try {
      verifyEmail(dataObject).unwrap();
    } catch (e) {
      console.log();
    }
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="">
        <div className="mt-10 mx-0 md:mx-4">
          {isLoading && <Loader /> ? null : isSuccess ? (
            <div className="bg-success shadow-3xl rounded-3xl px-2 md:px-4  py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <MdMarkEmailRead size="48" className="m-auto text-green-600" />
              </p>
              <p className="text-green-600 text-center font-semibold mt-4">Your email has been verified succesfully.</p>
            </div>
          ) : _.isEqual(error?.data?.errors[0]?.message, "User already verified") ? (
            <div className="bg-info shadow-3xl rounded-3xl px-2 md:px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <MdInfo size="48" className="m-auto text-blue-600" />
              </p>
              <p className="text-blue-600 text-center font-semibold mt-4">Your email has already verified.</p>
            </div>
          ) : (
            <div className="bg-error shadow-3xl rounded-3xl px-2 md:px-8 py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
              <p className="">
                <VscError size="48" className="m-auto text-red-600" />
              </p>
              <p className="text-red-600 text-center font-semibold mt-4">Unknow error occurs while verified your email.</p>
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

export default VerifyEmailScreen;
