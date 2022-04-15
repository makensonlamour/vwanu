import { api } from "./api";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";

export const fetcher = (url, params, pageParam) => {
  return api.get(url, { params: { ...params, page: pageParam?.pageParam } }).then((res) => res.data);
};

export const useLoadMore = (queryKey, url, params) => {
  const context = useInfiniteQuery(queryKey, (pageParam = 0) => fetcher(url, params, pageParam), {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.data.totalPages;
      const nextPage = allPages.length;
      return nextPage < maxPages ? nextPage : undefined;
    },
  });

  return context;
};

export const usePrefetch = (queryKey, url, params) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery(queryKey, () => fetcher(url, params));
  };
};

export const useFetch = (queryKey, url, params, config) => {
  const context = useQuery(queryKey, () => fetcher(url, params), {
    enabled: url ? true : false,
    ...config,
  });

  return context;
};

const useGenericMutation = (func, queryKey, url, params, updater) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(queryKey);

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        return updater ? updater(oldData, data) : data;
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context);
    },
    onSettled: (queryKey) => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export const useDelete = (queryKey, url, params, updater) => {
  return useGenericMutation((id) => api.delete(`${url}/${id}`), url, params, updater);
};

export const usePost = (queryKey, url, params, updater) => {
  return useGenericMutation((data) => api.post(url, data), url, params, updater);
};

export const useUpdate = (queryKey, url, params, updater) => {
  return useGenericMutation((data) => api.put(`${url}/${data?.id}`, data), url, params, updater);
};