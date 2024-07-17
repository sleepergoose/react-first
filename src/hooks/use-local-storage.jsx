import { useState, useEffect } from 'react';

const getValue = (key, initialValue) => {
  try {
    const _value = localStorage.getItem(key);
    if (_value) {
      return JSON.parse(_value);
    }

    return initialValue;
  } catch (error) {
    console.log(error?.message);
  }
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(getValue(key, initialValue || null));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error?.message);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
