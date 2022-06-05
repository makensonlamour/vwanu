import React from "react";
import PropTypes from "prop-types";
import { useGetListFriendReceive } from "../../../features/friend/friendSlice";

const Friends = ({ fn }) => {
  const { data: listFriendReceive } = useGetListFriendReceive(["user", "received"], true);

  fn(listFriendReceive?.data?.length);

  return (
    <>
      <div className="my-2">
        <div className="flex flex-wrap lg:justify-between xl:justify-start py-2">
          {listFriendReceive?.data?.length > 0 ? (
            listFriendReceive?.data?.map((friend, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white w-[100%] sm:w-[49%] md:w-[100%] lg:w-[49%] xl:w-[32%] xl:mx-2 rounded-xl border pt-8 hover:shadow-xl my-3"
                >
                  <img
                    className="object-cover w-28 h-28 mask mask-squircle mx-auto mb-2"
                    src={friend?.profilePicture?.original}
                    alt="_profile"
                  />
                  <p className="mx-auto py-3 font-semibold text-lg text-gray-900 text-center">
                    {friend?.firstName + " " + friend?.lastName}
                  </p>
                  <p className="mx-auto font-normal text-sm text-gray-400 text-center">{"Joined Apr 2022"}</p>
                  <p className="mx-auto py-1 font-normal text-sm text-gray-400 text-center">{"14 followers"}</p>
                  <div className="px-4">
                    <button className="capitalize mt-4 mb-8 rounded-xl px-3 btn btn-sm bg-white w-full border border-gray-300 text-gray-900 hover:text-base-100 hover:bg-primary hover:border-0">
                      Send Message
                    </button>
                  </div>
                  <div className="flex border border-gray-300 rounded-b-xl -px-6 justify-around bg-placeholder-color">
                    <button className="basis-1/2 py-3 border-r border-gray-300 hover:text-primary hover:bg-gray-100">Follow</button>
                    <button className="basis-1/2 py-3 border-l border-gray-300 hover:text-primary hover:bg-gray-100">Connect</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex w-52 p-6 mx-auto">
              <span>No Friends Request</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Friends.propTypes = {
  user: PropTypes.object,
  fn: PropTypes.func,
};

export default Friends;
