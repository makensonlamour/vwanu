import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { useGetListFriendReceive } from "../../../features/friend/friendSlice";
import { Badge } from "@mui/material";

// import AcceptFriendRequestButton from "../../../features/friend/component/AcceptFriendRequestButton";

// import routesPath from "../../../routesPath";

const FriendsPreview = () => {
  const { data: listFriendReceive } = useGetListFriendReceive(["user", "received"], true);
  const [friendReceiveNumber, setFriendReceiveNumber] = useState(0);

  const calculateLength = () => {
    if (listFriendReceive && listFriendReceive?.pages?.length > 0) {
      // eslint-disable-next-line array-callback-return
      listFriendReceive?.pages?.map((item) => {
        setFriendReceiveNumber(item?.data?.length);
      });
    }
  };

  useEffect(() => {
    calculateLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFriendReceive]);

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={friendReceiveNumber} color="primary" className="">
            <AiOutlineUserAdd size={"24px"} />
          </Badge>
        </label>
        <ul
          tabIndex="2"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[90vw] sm:w-96 text-gray-900 overflow-auto scrollbar h-fit max-h-96"
        >
          {listFriendReceive &&
          listFriendReceive?.pages &&
          listFriendReceive?.pages?.length > 0 &&
          listFriendReceive?.pages[0]?.data?.total > 0 ? (
            <li>
              {listFriendReceive?.pages?.map((page, idx) => {
                return page.data?.map((friend) => {
                  return (
                    <Link key={idx} to={"/profile/" + friend?.id} className="text-base border-b hover:bg-placeholder-color mx-2 rounded-xl">
                      <div className="flex items-center align-middle justify-between">
                        <div className="w-12">
                          <img className="object-cover w-8 h-8 mask mask-squircle" src={friend?.profilePicture?.original} alt="" />
                        </div>
                        <div className="text-secondary text-sm w-40">{friend?.firstName + " " + friend?.lastName}</div>
                        <div className="w-48">
                          <button
                            to={"/profile/" + friend?.id}
                            className="capitalize ml-auto text-sm items-right align-middle mr-1 btn btn-sm btn-secondary text-base-100 rounded-xl mb-2 lg:mb-0 hover:bg-primary justify-end"
                          >
                            Visit profile
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                });
              })}
            </li>
          ) : (
            <>
              <div className="w-full text-green-500 font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> No Friend request</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default FriendsPreview;
