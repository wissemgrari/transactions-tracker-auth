import { Box } from '@mui/material';
import MiniDrawer, { DrawerHeader } from './MiniDrawer';

const Dashboard = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer />
      <Box
        sx={{
          width: '1400px',
          height: '100vh',
          margin: ' 20px 40px',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
export default Dashboard;
