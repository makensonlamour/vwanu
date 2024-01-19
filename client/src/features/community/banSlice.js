import { usePost } from "../../lib/react-query";

export const useCreateCommunityBan = (queryKey, oldData, newData) => usePost(queryKey, `/community-bans`, (oldData, newData));
