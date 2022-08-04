import { Avatar } from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const TransactionIcon = ({ type }) => {
  return (
    <Avatar sx={{ bgcolor: type === 'income' ? '#4caf50' : '#f44336' }}>
      <MoneyOffIcon />
    </Avatar>
  );
};
export default TransactionIcon;
