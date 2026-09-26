import { useEffect, useState } from 'react';

/** Like useState, but the value is saved to localStorage and restored on reload. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private mode, full quota); the app keeps working in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
