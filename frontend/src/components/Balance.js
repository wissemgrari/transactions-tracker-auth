import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const amounts = transactions.map((transaction) =>
    transaction.type === 'income' ? transaction.amount : transaction.amount * -1
  );
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <Grid item xs={12} md={3}>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography variant='h6' color='primary' pb={1}>
            Balance
          </Typography>
          <Divider />
          <Typography variant='h4' py={1}>
            {balance} $
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='p' color='GrayText' pb={1}>
              On {format(new Date(), 'PPP')}
            </Typography>
            <Typography variant='p' color='GrayText' pb={1}>
              At {format(new Date(), 'p')}
            </Typography>
          </Box>
        </Box>

        <Typography color='primary'>
          <Link to='/statistics'>View statistics</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Balance;
