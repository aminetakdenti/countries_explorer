import { useMemo, useState } from "react";

interface PaginationResult<T> {
  paginated: T[];
  loadMore: () => void;
  hasMore: boolean;
  page: number;
  isLoadingMore: boolean;
}

export function usePagination<T>(
  data: T[] = [],
  pageSize: number = 20,
): PaginationResult<T> {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const paginated = useMemo<T[]>(() => {
    const end = page * pageSize;
    return data.slice(0, end);
  }, [page, data, pageSize]);

  const loadMore = () => {
    return new Promise((resolve) => {
      setIsLoadingMore(true);
      setTimeout(() => {
        if (page * pageSize < data.length) {
          resolve(setPage((p) => p + 1));
          setIsLoadingMore(false);
        }
      }, 2000);
    });
  };

  const hasMore = page * pageSize < data.length;

  return { paginated, loadMore, hasMore, page, isLoadingMore };
}
