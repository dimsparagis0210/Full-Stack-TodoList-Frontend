/**
 * Debounced search hook
 *
 * This hook is used to search for users with a debounced search.
 * The way it works is that it waits for the user to stop typing for a certain amount of time before making the request.
 * It also uses a debounced search to search for users.
 */
import { useState, useEffect } from "react";
import { useSearchUsers } from "./use-search-users";

export const useDebouncedSearch = (delay: number = 300) => {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  // Get search results
  const { data: users = [], isLoading, error } = useSearchUsers(debouncedQuery);

  // Determine loading state
  const isTyping = searchQuery !== debouncedQuery;
  const showLoading = isLoading || isTyping;

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    users,
    showLoading,
    error,
    clearSearch,
    hasQuery: !!debouncedQuery,
  };
};
