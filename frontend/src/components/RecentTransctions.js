import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TransactionIcon from './TransactionIcon';
import { styled } from '@mui/material/styles';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteTransaction from './DeleteTransaction';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    fontSize: 15,
    padding: 10,
  },
}));

const RecentTransctions = () => {
  const { transactions } = useSelector((state) => state.transaction);

  return (
    <Grid item xs={12} md={12} pb={2}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant='h6' color='primary' pb={1}>
          Recent Transactions
        </Typography>
        <Divider />
        <TableContainer sx={{ py: 1, px: 2 }}>
          <Table
            sx={{
              minWidth: 650,
            }}
            size='small'
          >
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
              {transactions.slice(0, 3).map((item) => (
                <TableRow key={item._id} hover={true}>
                  <StyledTableCell component='th' scope='row'>
                    <TransactionIcon type={item.type} />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {formatDistanceToNowStrict(new Date(item.date), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{item.type}</StyledTableCell>
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
          <Link to='/transactions'>
            <Typography pt={2} color='primary'>
              See all transactions
            </Typography>
          </Link>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
export default RecentTransctions;
