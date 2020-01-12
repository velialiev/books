import { useEffect } from 'react';
import getItemPage from '../util/page-finder.util';

const useFocusSelected = (items, queryParams, handleSelection, setPage, idPropertyName) => {
  useEffect(() => {
    const selected = queryParams.get('selected');

    if (selected) {
      const item = handleSelection(selected);
      setPage(
        getItemPage(item, items, idPropertyName, 10),
      );
      setTimeout(() => {
        document.getElementById(selected) && document.getElementById(selected).scrollIntoView();
      })
    }
  }, [items, setPage, idPropertyName]);
};

export default useFocusSelected;
