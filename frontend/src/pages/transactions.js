import { useState } from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, Typography } from '@mui/material';
import { format } from 'date-fns';
import TransactionIcon from '../components/TransactionIcon';
import DeleteTransaction from '../components/DeleteTransaction';
import { ImportExport } from '@mui/icons-material';
import Dashboard from '../components/Dashboard';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    fontSize: 16,
    padding: 15,
  },
}));

export default function Statistics() {
  const { transactions } = useSelector((state) => state.transaction);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Dashboard>
      <Typography
        variant='h5'
        color='primary'
        pb={3}
        pt={1}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <ImportExport sx={{ fontSize: '32px' }} />
        All Transactions
      </Typography>
      <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Icon</StyledTableCell>
                <StyledTableCell align='center'>Date</StyledTableCell>
                <StyledTableCell align='center'>Type</StyledTableCell>
                <StyledTableCell align='center'>Category</StyledTableCell>
                <StyledTableCell align='center'>Amount</StyledTableCell>
                <StyledTableCell align='center'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item._id} hover={true}>
                    <StyledTableCell component='th' scope='row'>
                      <TransactionIcon type={item.type} />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {format(new Date(item.date), 'MM-dd-yyyy')}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {item.type}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {item.amount} $
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <DeleteTransaction id={item._id} />
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {transactions.length > 6 ? (
          <TablePagination
            rowsPerPageOptions={[6, 10, 15]}
            component='div'
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </Paper>
    </Dashboard>
  );
}
