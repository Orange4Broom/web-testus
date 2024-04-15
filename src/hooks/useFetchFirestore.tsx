import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useFetchFirestore = <T extends object>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setData(result as T[]);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [collectionName]);

  return { data, isPending, error };
};
