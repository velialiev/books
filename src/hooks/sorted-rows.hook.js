import { useEffect, useState } from 'react';
import copyDeep from '../util/copy-deep.util';
import { get as getFieldByPath } from 'lodash';

const useSortedRows = (rows, tableHead) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [orderBy, setOrderBy] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    setSortedRows(
      copyDeep(rows).sort((a, b) => {
        const { sortByField } = tableHead.find(cell => cell.id === orderBy) || {};

        if (!sortByField) return 0;

        const firstItemField = getFieldByPath(a, sortByField).toString().toLowerCase();
        const secondItemField = getFieldByPath(b, sortByField).toString().toLowerCase();

        if (order === 'asc') {
          return firstItemField > secondItemField ? 1 : -1;
        }

        return firstItemField > secondItemField ? -1 : 1;
      }),
    );
  }, [orderBy, order, rows, tableHead]);

  return {
    sortedRows: [sortedRows, setSortedRows],
    orderBy: [orderBy, setOrderBy],
    order: [order, setOrder],
  }
};

export default useSortedRows;
