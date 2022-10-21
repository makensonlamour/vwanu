import { usePost, useUpdate, useDelete, useLoadMore } from "../../lib/react-query";

export const useSendFriendRequest = (queryKey) => usePost(queryKey, `/friendRequest`);

export const useCancelFriendRequest = (queryKey, friendId) => useDelete(queryKey, `/friendRequest?friendId=${friendId}`);

export const useGetListFriendRequestSent = (queryKey, enabled = true) =>
  useLoadMore(queryKey, enabled, `/friendRequest/?action=people-i-want-to-be-friend-with`);

export const useGetListFriendReceive = (queryKey, enabled = true) =>
  useLoadMore(queryKey, enabled, `/friendRequest/?action=people-who-want-to-Be-my-friend`);

export const useFollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=follow`);
/* 
export const useUnfollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=unfollow`); */

export const useAcceptFriendRequest = (queryKey) => useUpdate(queryKey, `/friendRequest`);
export const useDeclineFriendRequest = (queryKey) => useUpdate(queryKey, `/friendRequest`);
export const useGetListFriend = (queryKey, enabled = true, UserId) =>
  useLoadMore(queryKey, enabled, UserId !== undefined ? `/friends?UserId=${UserId}` : `/friends`);
export const useUnfriendUser = (queryKey, friendID) => useDelete(queryKey, `/friends/?friendId=${friendID}`);
