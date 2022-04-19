import React from "react";
import { useGetListFriendRequest } from "../../features/friend/friendSlice";
import FriendButton from "../../features/friend/component/FriendButton";

const ViewFriend = () => {
  const { data: listFriendRequest } = useGetListFriendRequest(["user", "me"], true);

  return (
    <>
      <div className="bg-white w-full rounded-lg mx-2 border p-4">
        <h4 className="mb-2 border-b font-semibold text-secondary">
          Friends {" (" + listFriendRequest?.data?.user?.friends?.length + ")"}
        </h4>
        <div className="flex flex-wrap">
          {listFriendRequest?.data?.user?.friends?.length > 0 ? (
            listFriendRequest?.data?.user?.friends?.map((friend, idx) => {
              return (
                <div key={idx} className="p-4 border mx-1 rounded-lg">
                  <img className="w-16 h-16 mask mask-squircle mx-auto mb-2" src={friend?.profilePicture} alt="_profile" />
                  <span className="mx-auto font-semibold text-secondary text-center">{friend?.firstName + " " + friend?.lastName}</span>
                  <div className="block px-2 pt-2">
                    <FriendButton otherUser={{ id: friend?.id }} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex w-52 p-10 mx-auto">
              <span>No Friends</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewFriend;
