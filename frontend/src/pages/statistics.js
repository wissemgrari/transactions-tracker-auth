import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import BalancePie from '../components/BalancePie';
import ExpenseDoughnut from '../components/ExpenseDoughnut';
import IncomeDoughnut from '../components/IncomeDoughnut';
import helper from '../utils/helper';
import Dashboard from '../components/Dashboard';

const Statistics = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const expenses = [];
  const incomes = [];

  transactions.filter((transaction) =>
    transaction.type === 'expense'
      ? expenses.push(transaction)
      : incomes.push(transaction)
  );
  helper.removeDuplicate(expenses);
  helper.removeDuplicate(incomes);

  const totalExpenseBalance = expenses
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  const totalIncomesBalance = incomes
    .map((income) => income.amount)
    .reduce((acc, item) => (acc += item), 0);

  const total = [
    { type: 'incomes', balance: totalIncomesBalance },
    { type: 'expenses', balance: totalExpenseBalance },
  ];

  return (
    <Dashboard>
      <Grid container spacing={3} pt={1} pb={2}>
        <Grid item xs={12} md={6}>
          <IncomeDoughnut
            incomes={incomes}
            totalIncomesBalance={totalIncomesBalance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseDoughnut
            expenses={expenses}
            totalExpenseBalance={totalExpenseBalance}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <BalancePie total={total} />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default Statistics;
