import { usePost, useFetch, useDelete } from "../../lib/react-query";

export const useSendFriendRequest = (queryKey) => usePost(queryKey, `/user/request`);
export const useCancelFriendRequest = (queryKey) => useDelete(queryKey, `/user/request`);
export const useGetListFriendRequest = (queryKey, enabled) => useFetch(queryKey, enabled, `/user/request`);
export const useFollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=follow`);
/* 
export const useUnfollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=unfollow`); */

export const useAcceptFriendRequest = (queryKey) => usePost(queryKey, `/user/friend`);
export const useDeclineFriendRequest = (queryKey) => usePost(queryKey, `/user/friend`);
export const useGetListFriend = (queryKey, enabled) => useFetch(queryKey, enabled, `/user/friend`);
export const useUnfriendUser = (queryKey) => useDelete(queryKey, `/user/friend`);
