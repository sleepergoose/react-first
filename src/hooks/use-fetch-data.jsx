import { useState, useEffect, useCallback } from 'react';
import httpService from '../services/http.service.js';

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await httpService.get(url);
      setData(response);
    } catch (error) {
      setError(error);
    }

    setIsPending(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error };
};
