import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  DarkModeOutlined,
  Save,
  Brightness4Outlined,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signup, reset } from '../features/auth/authSlice';
import { toggleDarkMode } from '../features/global/darkModeSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { darkMode } = useSelector((state) => state.darkMode);
  const [showPassword, setShowPassword] = useState(false);
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = yup.object({
    fullName: yup
      .string('Enter your Full Name')
      .min(5, 'Must be 5 characters at least')
      .required('Full Name is Required'),

    email: yup
      .string('Enter your email')
      .email('Email is invalid')
      .min(8, 'Email must be at least 8 charaters')
      .required('Email is required'),

    phone: yup
      .number()
      .test(
        'len',
        'Phone must be at least 8 charaters',
        (val) => val && val.toString().length >= 8
      )
      .typeError('Phone must be number')
      .required('Phone is required'),

    password: yup
      .string('Enter your password')
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),

    confirmPassword: yup
      .string('Confirm your password')
      .oneOf([yup.ref('password'), null], 'Passwords does not match')
      .required('Confirm password is required'),
  });
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      dispatch(signup(data));
    },
  });

  useEffect(() => {
    if (user?.token) {
      navigate('/');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/signin');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  return (
    <Container>
      <CssBaseline />
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
      <Paper
        elevation={3}
        sx={{
          maxWidth: '450px',
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: '#e91e63' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h5' mt={1} mb={3}>
            Sign up
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ py: 1 }}>
            <TextField
              label='Full Name'
              variant='outlined'
              name='fullName'
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </FormControl>
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
              label='Phone Number'
              variant='outlined'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </FormControl>
          <FormControl fullWidth sx={{ py: 1 }}>
            <TextField
              label='Password'
              variant='outlined'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
          <FormControl fullWidth sx={{ py: 1 }}>
            <TextField
              label='Repeat Password'
              variant='outlined'
              name='confirmPassword'
              type='password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </FormControl>
          {!isLoading ? (
            <Button variant='contained' fullWidth sx={{ my: 1 }} type='submit'>
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
          Already have an account ?&nbsp;
          <Link style={{ color: '#3f51b5', fontWeight: 'bold' }} to='/signin'>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
export default Signup;
