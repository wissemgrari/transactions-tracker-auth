import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Signin from './pages/signin';
import Signup from './pages/signup';
import RequireAuth from './components/RequireAuth';

import Home from './pages/home';
import Profile from './pages/profile';
import Statistics from './pages/statistics';
import Transactions from './pages/transactions';
import Dunno from './pages/dunno';
import NotFound from './pages/404';

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3F51B5',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#757de8',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/dunno' element={<Dunno />} />
          </Route>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-center'
        hideProgressBar={false}
        autoClose={5000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme={darkMode ? 'dark' : 'light'}
        pauseOnHover={false}
      />
    </ThemeProvider>
  );
}

export default App;
