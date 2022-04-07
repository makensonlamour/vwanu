import { api } from "./api";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";

export const fetcher = ({ queryKey, pageParam }) => {
  const [url, params] = queryKey;
  return api.get(url, { params: { ...params, page: pageParam } }).then((res) => res.data);
};

export const useLoadMore = (url, params) => {
  const context = useInfiniteQuery([url, params], ({ queryKey, pageParam = 0 }) => fetcher({ queryKey, pageParam }), {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.data.totalPages;
      const nextPage = allPages.length;
      return nextPage < maxPages ? nextPage : undefined;
    },
  });

  return context;
};

export const usePrefetch = (url, params) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery([url, params], ({ queryKey }) => fetcher({ queryKey }));
  };
};

export const useFetch = (url, params, config) => {
  const context = useQuery([url, params], ({ queryKey }) => fetcher({ queryKey }), {
    enabled: true,
    ...config,
  });

  return context;
};

const useGenericMutation = (func, url, params, updater) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData([url, params], (oldData) => {
        return updater ? updater(oldData, data) : data;
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = (url, params, updater) => {
  return useGenericMutation((id) => api.delete(`${url}/${id}`), url, params, updater);
};

export const usePost = (url, params, updater) => {
  return useGenericMutation((data) => api.post(url, data), url, params, updater);
};

export const useUpdate = (url, params, updater) => {
  return useGenericMutation((data) => api.put(url, data), url, params, updater);
};
