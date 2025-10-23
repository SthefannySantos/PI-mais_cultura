import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(localStorage.getItem(key));
    }
  }, [key]);

  return value;
}
