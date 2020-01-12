import { useEffect, useState } from 'react';

const useItemsSearch = (items, searchValue, searchFieldName, afterSearch) => {
  const [searchedAuthors, setSearchedAuthors] = useState(items);

  useEffect(() => {
    setSearchedAuthors(
      items.filter(
        item => item[searchFieldName].toLowerCase()
        .includes(searchValue.toLowerCase()),
      )
    );
    afterSearch();
  }, [searchValue, items]);

  return searchedAuthors;
};

export default useItemsSearch;
