import { Link } from 'react-router-dom';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => (
  <>
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        my: 4,
      }}
    >
      <Typography align='center' fontWeight={600} variant='h2'>
        The page you are looking for
        <br /> isn't here
      </Typography>
      <Typography align='center' variant='subtitle2' mt={1}>
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <img
          alt='Under development'
          src='/notFound.svg'
          style={{
            marginTop: 50,
            display: 'inline-block',
            maxWidth: '100%',
            width: 560,
          }}
        />
      </Box>
      <Link to='/'>
        <Button
          startIcon={<ArrowBackIcon fontSize='small' />}
          sx={{ mt: 3, borderRadius: '10px', py: 1, fontWeight: 'bold' }}
          variant='contained'
        >
          Go back to dashboard
        </Button>
      </Link>
    </Box>
  </>
);

export default NotFound;
