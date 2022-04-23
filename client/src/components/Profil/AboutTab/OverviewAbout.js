import React from "react";
import Proptypes from "prop-types";
import { GoLocation, GoHome } from "react-icons/go";

const OverviewAbout = ({ user }) => {
  return (
    <>
      <div>
        <ul className="my-2  font-bold">
          {user?.country ? (
            <li className="py-2 hover:bg-gray-50 ">
              <div className="flex align-middle">
                <span>
                  <GoLocation size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{"From "}</span>
                {user?.country}
              </div>
            </li>
          ) : null}

          {user?.country ? (
            <li className="py-2 hover:bg-gray-50 block">
              <div className="flex align-middle">
                <span>
                  <GoHome size="38px" className="mr-3 rounded-full bg-sky-200 p-2" />
                </span>
                <span className="font-normal text-md mr-2">{"Lives in "}</span> {user?.country}
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

OverviewAbout.propTypes = {
  user: Proptypes.object,
};

export default OverviewAbout;
