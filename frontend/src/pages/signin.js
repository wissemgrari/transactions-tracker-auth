import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  LockOutlined,
  Save,
  Visibility,
  VisibilityOff,
  DarkModeOutlined,
  Brightness4Outlined,
  Close,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { reset, signin } from '../features/auth/authSlice';
import { toggleDarkMode } from '../features/global/darkModeSlice';
import { LoadingButton } from '@mui/lab';
import helper from '../utils/helper';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { darkMode } = useSelector((state) => state.darkMode);

  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Email is invalid')
      .min(8, 'Email must be at least 8 charaters')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      dispatch(signin(data));
    },
  });

  useEffect(() => {
    if (isSuccess || user?.token) {
      navigate('/');
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <Container>
      <CssBaseline />
      {/* Toggel Dark Mode/ Light Mode */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 3,
          pt: 3,
        }}
      >
        <IconButton
          sx={{ border: '1px solid #ccc', borderRadius: '10px' }}
          onClick={() => dispatch(toggleDarkMode())}
        >
          {!darkMode ? (
            <>
              <Typography mr={1} fontSize='16px'>
                Dark Mode
              </Typography>
              <DarkModeOutlined fontSize='small' />
            </>
          ) : (
            <>
              <Typography mr={1} fontSize='16px'>
                Light Mode
              </Typography>
              <Brightness4Outlined fontSize='small' />
            </>
          )}
        </IconButton>
      </Box>
      {/* Toggel Dark Mode/ Light Mode */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: '450px',
          margin: '40px auto',
        }}
      >
        {user && !user?.token && (
          <Box sx={{ width: '100%' }}>
            <Collapse in={isAlertOpen}>
              <Alert
                sx={{ mb: 2 }}
                severity='success'
                color='info'
                variant='standard'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setIsAlertOpen(false);
                    }}
                  >
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ fontSize: '1.1rem' }}>
                  Welcome again {helper.capitalizeName(user.fullName)}
                </AlertTitle>
              </Alert>
            </Collapse>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Avatar sx={{ bgcolor: '#e91e63' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant='h5' mt={1} mb={3}>
              Sign in
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ py: 1 }}>
              <TextField
                label='Email Address'
                variant='outlined'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
            <FormControl fullWidth sx={{ py: 1 }}>
              <TextField
                label='Password'
                variant='outlined'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={!showPassword ? 'password' : 'text'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={viewPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {!isLoading ? (
              <Button
                variant='contained'
                fullWidth
                sx={{ my: 1 }}
                type='submit'
              >
                SIGN UP
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition='start'
                startIcon={<Save />}
                variant='contained'
                fullWidth
              >
                Signing up
              </LoadingButton>
            )}
          </form>
          <Typography my={2}>
            Don't have an account ? &nbsp;
            <Link
              style={{
                color: '#3f51b5',
                fontWeight: 'bold',
              }}
              to='/signup'
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export default Signin;
