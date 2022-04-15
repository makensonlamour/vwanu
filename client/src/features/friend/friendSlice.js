import { usePost } from "../../lib/react-query";

export const useSendFriendRequest = (queryKey, dataObj) =>
  usePost(queryKey, `/user/request/${dataObj.userId}/${dataObj.otherUserId}?action=add-friend`);
/*
export const useDeleteFriendRequest = (queryKey, dataObj) =>
  usePost(queryKey, `/user/request/${dataObj.userId}/${dataObj.otherUserId}?action=delete-friend`);
*/
export const useFollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=follow`);
/* 
export const useUnfollowUser = (queryKey, dataObj) =>
  usePost(queryKey, `/user/follow/${dataObj.userId}/${dataObj.otherUserId}?action=unfollow`); */

export const useAcceptFriendRequest = (queryKey, dataObj) =>
  usePost(queryKey, `/user/friend/${dataObj.userId}/${dataObj.otherUserId}?action=add-friend`);
/* 
export const useDeclineFriendRequest = (queryKey, dataObj) =>
  usePost(queryKey, `/user/friend/${dataObj.userId}/${dataObj.otherUserId}?action=add-friend`);
 */
