import { useEffect, useState } from 'react';

const useFetchedData = (request) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let res;

      try {
        res = (await request()).data || [];
      }
      catch {
        res = [];
      } finally {
        setData(res);
      }
    })();
  }, [request]);

  const addItem = (item) => {
    setData([
      ...data,
      item,
    ])
  };

  return {
    data,
    setData,
    addItem,
  }
};

export default useFetchedData;
