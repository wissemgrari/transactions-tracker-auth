import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  createTransaction,
  reset,
} from '../features/transactions/transactionSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import helper from '../utils/helper';
import { toast } from 'react-toastify';

const incomes = [
  'Salary',
  'Savings',
  'Investments',
  'Extra Income',
  'Lottery',
  'Gifts',
  'Rental Income',
  'Other',
];
const expenses = [
  'Rent',
  'Food',
  'Bills',
  'Internet',
  'Transports',
  'Pets',
  'Entertainment',
  'Travels',
  'Clothes',
  'Other',
];

const AddTransaction = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.transaction);

  const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
    category: yup.string().required('Category is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .test(
        'len',
        'Amount must contains at least 2 numbers',
        (val) => val && val.toString().length >= 2
      ),
    date: yup
      .string()
      .typeError('Date is invalid')
      .required('Date is required'),
  });
  const formik = useFormik({
    initialValues: {
      type: 'income',
      category: '',
      amount: '',
      date: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        date: helper.formatDate(values.date),
      };
      dispatch(createTransaction(data)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success('Added !', {
            autoClose: 1000,
          });
          let data = JSON.parse(localStorage.getItem('transactions'));
          data = [res.payload, ...data];
          localStorage.setItem('transactions', JSON.stringify(data));
        }
        dispatch(reset());
        formik.resetForm();
      });
    },
  });

  return (
    <Grid item xs={12} md={9}>
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant='h6' color='primary' pb={1}>
            New Transaction
          </Typography>
          <Divider />
          <Grid container spacing={3} py={2}>
            <Grid item xs={6}>
              <FormControl variant='standard' fullWidth>
                <InputLabel id='type'>Type</InputLabel>
                <Select
                  variant='standard'
                  name='type'
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                >
                  <FormHelperText>
                    {formik.touched.type && formik.errors.type}
                  </FormHelperText>
                  <MenuItem value='income'>Income</MenuItem>
                  <MenuItem value='expense'>Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant='standard' fullWidth>
                <InputLabel
                  id='category'
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  Category
                </InputLabel>
                <Select
                  name='category'
                  variant='standard'
                  labelId='category'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  {formik.values.type === 'income' &&
                    incomes.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  {formik.values.type === 'expense' &&
                    expenses.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={Boolean(formik.errors.category)}>
                  {formik.touched.category && formik.errors.category}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant='standard'
                label='Amount'
                name='amount'
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Date of transaction'
                  name='date'
                  inputFormat='dd/MM/yyyy'
                  value={formik.values.date}
                  onChange={(value) =>
                    formik.setFieldValue('date', value, true)
                  }
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      variant='standard'
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                disabled={isLoading}
              >
                CREATE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Grid>
  );
};
export default AddTransaction;
