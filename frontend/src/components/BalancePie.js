import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Paper, Typography, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const BalancePie = ({ total }) => {
  const colors = ['#039be5', '#e57373'];
  const data = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        label: 'Balance statistics',
        data: total.map((el) => el.balance),
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Typography variant='h6' color='gray'>
          Balance
        </Typography>
        <Typography variant='h5' pt={3}>
          $ {total[0].balance - total[1].balance}
        </Typography>
      </Box>
      <Box sx={{ width: '500px' }}>
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </Box>
    </Paper>
  );
};

export default BalancePie;
