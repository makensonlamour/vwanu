import React from "react";
import Proptypes from "prop-types";
import { GoLocation, GoHome } from "react-icons/go";

const ViewPlaceLived = ({ user }) => {
  return (
    <>
      <div>
        <ul className="my-2">
          <h1 className="text-primary py-2">Places lived</h1>
          {user?.country ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <GoLocation size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.country}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Current city</p>
            </li>
          ) : null}

          {user?.country ? (
            <li className="py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex align-middle">
                <span>
                  <GoHome size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{user?.country}</span>
              </div>
              <p className="text-sm -mt-2 font-normal ml-14">Hometown</p>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

ViewPlaceLived.propTypes = {
  user: Proptypes.object,
};

export default ViewPlaceLived;
