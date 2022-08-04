import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  deleteTransaction,
  reset,
} from '../features/transactions/transactionSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteTransaction = ({ id }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDisabled(true);
    dispatch(deleteTransaction(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Deleted', {
          autoClose: 1000,
        });
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        localStorage.setItem(
          'transactions',
          JSON.stringify(transactions.filter((el) => el._id !== id))
        );
      }
      dispatch(reset());
      setDisabled(false);
    });
  };
  return (
    <IconButton aria-label='delete' onClick={handleDelete} disabled={disabled}>
      <Delete />
    </IconButton>
  );
};

export default DeleteTransaction;
