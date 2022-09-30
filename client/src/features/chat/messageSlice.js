import { useFetch, usePost, useUpdate, useLoadMore } from "../../lib/react-query";

export const useCreateConversation = (queryKey, oldData, newData) => usePost(queryKey, `/conversation`, (oldData, newData));

export const useListConversation = (queryKey, enabled = true) => useLoadMore(queryKey, enabled, `/conversation`);

export const useCreateNewMessage = (queryKey, oldData, newData) => usePost(queryKey, `/message`, (oldData, newData));

export const useListMessageOfConversation = (queryKey, enabled = true, conversationId) =>
  useLoadMore(queryKey, enabled, `/message?ConversationId=${conversationId}&$sort[createdAt]=-1`);

export const useGetConversation = (queryKey, enabled, conversationId) => useFetch(queryKey, enabled, `/conversation/${conversationId}`);

export const useReadMessage = (queryKey, oldData, newData) => useUpdate(queryKey, `/message`, (oldData, newData));
