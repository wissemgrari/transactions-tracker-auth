import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { format } from 'date-fns';
import Dashboard from '../components/Dashboard';
import helper from '../utils/helper';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Dashboard>
      <Grid
        container
        pt={1}
        pb={2}
        spacing={2}
        columns={9}
        sx={{ maxWidth: '1200px', margin: 'auto' }}
      >
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '4px solid #3F51B5',
            }}
          >
            <Avatar
              src='https://bootdey.com/img/Content/avatar/avatar7.png'
              sx={{ width: 150, height: 150, border: '2px solid #ccc' }}
            />
            <Typography variant='h5' fontWeight='600' mt={2}>
              {helper.capitalizeName(user.fullName)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              pb: 1,
              px: 2,
              display: 'flex',
              borderBottom: '4px solid #3F51B5',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box py={2} sx={{ display: 'flex' }}>
                <Typography fontWeight='600' flex={1}>
                  Full Name:
                </Typography>
                <Typography color='gray' flex={2}>
                  {helper.capitalizeName(user.fullName)}
                </Typography>
              </Box>
              <Box py={2} sx={{ display: 'flex' }}>
                <Typography fontWeight='600' flex={1}>
                  Email:
                </Typography>
                <Typography color='gray' flex={2}>
                  {user.email}
                </Typography>
              </Box>
              <Box py={2} sx={{ display: 'flex' }}>
                <Typography fontWeight='600' flex={1}>
                  Password:
                </Typography>
                <Typography color='gray' flex={2}>
                  *************
                </Typography>
              </Box>
              <Box py={2} sx={{ display: 'flex' }}>
                <Typography fontWeight='600' flex={1}>
                  Phone:
                </Typography>
                <Typography color='gray' flex={2}>
                  {user.phone}
                </Typography>
              </Box>
              <Box py={2} sx={{ display: 'flex' }}>
                <Typography fontWeight='600' flex={1}>
                  Created At:
                </Typography>
                <Typography color='gray' flex={2}>
                  {format(new Date(user.createdAt), '	PPPPp')}
                </Typography>
              </Box>
              <Divider />
              <Button
                variant='contained'
                sx={{ mt: 2, mb: 1 }}
                startIcon={<Edit />}
              >
                Edit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
};
export default Profile;
