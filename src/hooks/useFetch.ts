import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const reFetch = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  };
  return { data, reFetch };
};

export default useFetch;
