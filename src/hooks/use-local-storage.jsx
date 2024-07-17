import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(getValue);

  const getValue = () => {
    try {
      const _value = localStorage.getItem(key);

      if (_value) {
        return JSON.parse(_value);
      }

      return initialValue;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
