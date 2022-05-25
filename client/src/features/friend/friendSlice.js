import { usePost, useFetch, useDelete } from "../../lib/react-query";

export const useSendFriendRequest = (queryKey) => usePost(queryKey, `/friendRequest`);

export const useCancelFriendRequest = (queryKey) => usePost(queryKey, `/friendRequest`);

export const useGetListFriendRequestSent = (queryKey, enabled) =>
  useFetch(queryKey, enabled, `/friendRequest/?action=people-i-want-to-be-friend-with`);

export const useGetListFriendReceive = (queryKey, enabled) =>
  useFetch(queryKey, enabled, `/friendRequest/?action=people-who-want-to-Be-my-friend`);

export const useFollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=follow`);
/* 
export const useUnfollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=unfollow`); */

export const useAcceptFriendRequest = (queryKey) => usePost(queryKey, `/user/friend`);
export const useDeclineFriendRequest = (queryKey) => usePost(queryKey, `/user/friend`);
export const useGetListFriend = (queryKey, enabled) => useFetch(queryKey, enabled, `/user/friend`);
export const useUnfriendUser = (queryKey) => useDelete(queryKey, `/user/friend`);
