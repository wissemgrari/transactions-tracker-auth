import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Paper, Typography, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseDoughnut = ({ expenses, totalExpenseBalance }) => {
  const colors = [
    '#039be5',
    '#7986cb',
    '#9575cd',
    '#eebbf2',
    '#69f0ae',
    '#a5d1c5',
    '#917d7d',
  ];
  const data = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: 'Expense statistics',
        data: expenses.map((expense) => expense.amount),
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
          Expenses
        </Typography>
        <Typography variant='h5' pt={3}>
          $ {totalExpenseBalance}
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

export default ExpenseDoughnut;
