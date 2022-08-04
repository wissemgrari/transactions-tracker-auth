import { Alert, AlertTitle, Paper } from '@mui/material';
import Dashboard from '../components/Dashboard';

function Dunno() {
  return (
    <Dashboard>
      <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
        <Alert severity='info'>
          <AlertTitle sx={{ fontSize: '1.3rem' }}>
            In development stage...
          </AlertTitle>
        </Alert>
      </Paper>
    </Dashboard>
  );
}
export default Dunno;
