import { useFetch, usePost, useUpdate, useLoadMore, useDelete } from "../../lib/react-query";
import { api } from "../../lib/api";

// export const useGetCommunityList = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/communities`);

export const useGetCommunityList = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/communities`);

export const useGetMyCommunityList = (queryKey, enabled = false, userId) => useFetch(queryKey, enabled, `/communities?UserId=${userId}`);

export const useGetCommunity = (queryKey, enabled = true, communityId) => useFetch(queryKey, enabled, `/communities/${communityId}`);

export const useCreateCommunity = (queryKey, oldData, newData) => usePost(queryKey, `/communities`, (oldData, newData));

export const useUpdateCommunity = (queryKey, communityId, oldData, newData) =>
  useUpdate(queryKey, `/communities/${communityId}`, (oldData, newData));

export const updateGroupPicture = (data) => api.patch(`/communities/${data?.id}`, data.formData);

export const useSendInvitation = (queryKey, oldData, newData) => usePost(queryKey, `/community-invitation-request`, (oldData, newData));

export const useUpdateInvitation = (queryKey, guestId, oldData, newData) =>
  useUpdate(queryKey, `/community-invitation-request/${guestId}`, (oldData, newData));

export const useSendMessage = (queryKey, oldData, newData) => usePost(queryKey, `/community-message-request`, (oldData, newData));

export const useAcceptInvitation = (queryKey, oldData, newData) => usePost(queryKey, `/communities-registrations`, (oldData, newData));

export const useJoinCommunity = (queryKey, oldData, newData) => usePost(queryKey, `/community-join`, (oldData, newData));

export const useGetAllMembersCommunity = (queryKey, enabled = true, communityId) =>
  useLoadMore(queryKey, enabled, `/community-users?CommunityId=${communityId}`);

export const useGetCommunityRole = (queryKey, enabled = true) => useFetch(queryKey, enabled, `/community-role`);

export const useGetCommunityMemberByUser = (queryKey, enabled = true, userId) =>
  useFetch(queryKey, enabled, `/community-users?UserId=${userId}`);

export const useGetCommunityInvitation = (queryKey, enabled = true, CommunityId) =>
  useFetch(queryKey, enabled, `/community-invitation-request?CommunityId=${CommunityId}`);

export const useGetMyCommunityInvitation = (queryKey, enabled = true, userId) =>
  useLoadMore(queryKey, enabled, `/community-invitation-request?guestId=${userId}`);

export const useCheckIfMember = (queryKey, enabled = true, communityId, userId) =>
  useFetch(queryKey, enabled, `/community-users/?CommunityId=${communityId}&UserId=${userId}`);

export const useGetCommunitySuggest = (queryKey, enabled = true, interest) =>
  useLoadMore(queryKey, enabled, `/communities?interests=${interest}`);

export const useGetCommunityByNew = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/communities?$sort[createdAt]=-1`);

export const useGetCommunityPopular = (queryKey, enabled = true) =>
  useLoadMore(queryKey, enabled, `/communities?$sort[amountOfMembers]=-1`);

export const useGetCommunityIn = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/communities?participate=true`);

export const useDeleteCommunity = (queryKey, communityId, oldData, newData) =>
  useDelete(queryKey, `/communities/${communityId}`, (oldData, newData));
