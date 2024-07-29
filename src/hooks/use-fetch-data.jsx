import { useState, useEffect, useCallback } from 'react';
import httpService from '../services/http.service.js';
import configs from '../configuration/config.js';

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  if (url.startsWith('/')) {
    url = url.slice(1);
  }

  const endpointUrl = `${configs.apiBaseUrl}/${url}`;

  const fetchData = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await httpService.get(endpointUrl);
      setData(response);
    } catch (error) {
      setError(error);
    }

    setIsPending(false);
  }, [endpointUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, isPending, error];
};
