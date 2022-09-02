import { useFetch, usePost, useUpdate } from "../../lib/react-query";

export const useCreateConversation = (queryKey, oldData, newData) => usePost(queryKey, `/conversation`, (oldData, newData));

export const useListConversation = (queryKey, enabled = true, userId) => useFetch(queryKey, enabled, `/conversation?UserId=${userId}`);

export const useCreateNewMessage = (queryKey, oldData, newData) => usePost(queryKey, `/message`, (oldData, newData));

export const useListMessageOfConversation = (queryKey, enabled = true, conversationId) =>
  useFetch(queryKey, enabled, `/message?ConversationId=${conversationId}`);

export const useGetConversation = (queryKey, enabled, conversationId) => useFetch(queryKey, enabled, `/conversation/${conversationId}`);

export const useReadMessage = (queryKey, oldData, newData) => useUpdate(queryKey, `/message`, (oldData, newData));
