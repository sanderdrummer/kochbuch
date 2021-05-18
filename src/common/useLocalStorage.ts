import { useEffect, useState } from "react";

export const getLocalStorageJson = (key: string) => {
  const json = localStorage.getItem(key);
  if (json) {
    return JSON.parse(json);
  }
  return undefined;
};
export const saveLocalStorageJson = <Value = unknown>(
  key: string,
  item: Value
) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const storageValue = getLocalStorageJson(key);
  const [value, setValue] = useState<T>(storageValue ?? initialValue);

  useEffect(() => {
    saveLocalStorageJson(key, value);
  }, [key, value]);

  return [value, setValue];
};
