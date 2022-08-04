import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Paper, Typography, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeDoughnut = ({ incomes, totalIncomesBalance }) => {
  const colors = [
    '#e8acda',
    '#e64985',
    '#ab2b5c',
    '#c70c0c',
    '#e57373',
    '#64b5f6',
    '#ffb74d',
  ];
  const data = {
    labels: incomes.map((income) => income.category),
    datasets: [
      {
        label: 'Income statistics',
        data: incomes.map((income) => income.amount),
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
          Incomes
        </Typography>
        <Typography variant='h5' pt={3}>
          $ {totalIncomesBalance}
        </Typography>
      </Box>
      <Box sx={{ width: '350px' }}>
        <Doughnut
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

export default IncomeDoughnut;
