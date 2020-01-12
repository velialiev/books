import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import useSortedRows from '../../hooks/sorted-rows.hook';
import { get as getFieldByPath } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from './AppTable.module.scss';

const AppTable = (
  {
    page = 0,
    setPage,
    tableHead,
    rows,
    cellsList,
    idFieldName,
    onRowClick,
    selectedRowId,
    searchValue,
    onSearch,
  }
) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    sortedRows: [sortedRows],
    orderBy: [orderBy, setOrderBy],
    order: [order, setOrder],
  } = useSortedRows(rows, tableHead);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const handleChangeSort = (cellId) => {
    if (orderBy === cellId) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setOrderBy(cellId);
    setOrder('asc');
  };

  return (
    <TableContainer component={Paper}
                    className="mt-10">
      <AppBar className={styles['search-bar']}
              position="static">
        <Toolbar>
          <TextField value={searchValue}
                     onChange={onSearch}
                     label="Search"/>
        </Toolbar>
      </AppBar>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map(cell => (
              <TableCell key={cell.id}
                         align="center">
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  onClick={() => handleChangeSort(cell.id)}
                >
                  {cell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
            <TableRow selected={selectedRowId === row[idFieldName]}
                      id={row[idFieldName]}
                      hover
                      key={row[idFieldName]}
                      onClick={() => {
                        onRowClick(row[idFieldName])
                      }}>
              {cellsList.map(cellName => (
                <TableCell key={cellName}
                           align="center">
                  {getFieldByPath(row, cellName)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default AppTable;
