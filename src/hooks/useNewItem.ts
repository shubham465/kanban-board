import { useState, useEffect, useRef } from "react";

export const useNewItem = () => {
  const [isNewItemAdded, setIsNewItemAdded] = useState(false);
  const newItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isNewItemAdded && newItemRef.current) {
      newItemRef.current.focus();
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
      setIsNewItemAdded(false);
    }
  }, [isNewItemAdded]);

  return { isNewItemAdded, setIsNewItemAdded, newItemRef };
};
