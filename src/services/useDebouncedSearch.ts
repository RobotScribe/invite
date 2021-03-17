import { useState, useEffect } from 'react';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export const useDebouncedSearch = (searchFunction: (text: string) => void) => {
  const [value, setValue] = useState('');

  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 200));

  useEffect(() => {
    debouncedSearchFunction(value);
  }, [debouncedSearchFunction, value]);

  return {
    value,
    setValue,
  };
};
