import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactions,
  reset,
} from '../features/transactions/transactionSlice';
import { logout } from '../features/auth/authSlice';

import { Grid } from '@mui/material';

import AddTransaction from '../components/AddTransaction';
import Balance from '../components/Balance';
import Dashboard from '../components/Dashboard';
import RecentTransctions from '../components/RecentTransctions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isError, message, isLoading } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (message === 'jwt expired') {
      dispatch(logout());
    }

    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/signin');
    }

    dispatch(getTransactions());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, message, isError]);

  if (isLoading) {
    toast.loading('Loading...', {
      onOpen: () => {
        if (isLoading) {
          toast.dismiss();
        }
      },
    });
  }

  return (
    <Dashboard>
      <Grid container spacing={3} sx={{ paddingLeft: '20px' }}>
        <AddTransaction />
        <Balance />
        <RecentTransctions />
      </Grid>
    </Dashboard>
  );
};
export default Home;
